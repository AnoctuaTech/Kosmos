#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_OUTPUT = '00-INDICE-portable.html';
const DEFAULT_ENTRY = '00-INDICE.html';
const STYLESHEET_NAME = 'styles-kosmos.css';

const cwd = process.cwd();
const posix = path.posix;

main();

function main() {
    const args = parseArgs(process.argv.slice(2));

    const outputAbsolute = path.isAbsolute(args.output)
        ? args.output
        : path.resolve(cwd, args.output);
    const outputRoute = toProjectRoute(outputAbsolute);
    const entryRoute = normalizeRouteArg(args.entry, '--entry');

    const stylesheetPath = path.join(cwd, STYLESHEET_NAME);
    if (!fs.existsSync(stylesheetPath)) {
        fail(`No se encontro "${STYLESHEET_NAME}" en la raiz del proyecto.`);
    }
    const stylesheet = fs.readFileSync(stylesheetPath, 'utf8');

    const ignoredRoutes = new Set();
    const defaultOutputRoute = normalizeProjectRoute(DEFAULT_OUTPUT);
    if (defaultOutputRoute) {
        ignoredRoutes.add(defaultOutputRoute);
    }
    if (outputRoute) {
        ignoredRoutes.add(outputRoute);
    }

    const htmlFiles = collectHtmlFiles(cwd, ignoredRoutes);
    if (htmlFiles.length === 0) {
        fail('No se encontraron archivos HTML para empaquetar.');
    }

    const sourcePages = new Map();
    for (const absolutePath of htmlFiles) {
        const route = toProjectRoute(absolutePath);
        if (!route) {
            continue;
        }
        const content = fs.readFileSync(absolutePath, 'utf8');
        if (isGeneratedPortableHtml(content)) {
            continue;
        }
        sourcePages.set(route, content);
    }

    if (!sourcePages.has(entryRoute)) {
        fail(`El entry "${entryRoute}" no existe dentro del proyecto.`);
    }

    const report = checkInternalLinks(sourcePages);

    if (args.check) {
        printCheckReport(report);
        process.exit(report.broken.length === 0 ? 0 : 1);
        return;
    }

    if (report.broken.length > 0) {
        printCheckReport(report);
        fail('Se detectaron enlaces internos rotos. Corrige eso antes de generar el portable.');
    }

    const portablePages = {};
    for (const [route, html] of sourcePages.entries()) {
        portablePages[route] = transformPageHtml(route, html, stylesheet);
    }

    const shellHtml = buildPortableShell({
        pages: portablePages,
        entryRoute,
        generatedAtIso: new Date().toISOString(),
    });

    fs.mkdirSync(path.dirname(outputAbsolute), { recursive: true });
    fs.writeFileSync(outputAbsolute, shellHtml, 'utf8');

    console.log(`[portable] Archivo generado: ${path.relative(cwd, outputAbsolute) || path.basename(outputAbsolute)}`);
    console.log(`[portable] Pantallas embebidas: ${Object.keys(portablePages).length}`);
    console.log(`[portable] Entry: ${entryRoute}`);
}

function parseArgs(argv) {
    const args = {
        output: DEFAULT_OUTPUT,
        entry: DEFAULT_ENTRY,
        check: false,
    };

    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];

        if (token === '--output') {
            const value = argv[i + 1];
            if (!value) {
                fail('Falta valor para --output');
            }
            args.output = value;
            i += 1;
            continue;
        }

        if (token === '--entry') {
            const value = argv[i + 1];
            if (!value) {
                fail('Falta valor para --entry');
            }
            args.entry = value;
            i += 1;
            continue;
        }

        if (token === '--check') {
            args.check = true;
            continue;
        }

        if (token === '--help' || token === '-h') {
            printHelp();
            process.exit(0);
            return args;
        }

        fail(`Argumento no reconocido: ${token}`);
    }

    return args;
}

function printHelp() {
    console.log('Uso: node scripts/build-portable.mjs [opciones]');
    console.log('');
    console.log('Opciones:');
    console.log(`  --output <archivo>   Archivo de salida (default: ${DEFAULT_OUTPUT})`);
    console.log(`  --entry <ruta>       Pantalla inicial dentro del proyecto (default: ${DEFAULT_ENTRY})`);
    console.log('  --check              Verifica links internos sin generar archivo');
    console.log('  --help, -h           Muestra esta ayuda');
}

function collectHtmlFiles(rootDir, ignoredRoutes) {
    const collected = [];

    walk(rootDir);

    collected.sort((a, b) => {
        const routeA = toProjectRoute(a) || a;
        const routeB = toProjectRoute(b) || b;
        return routeA.localeCompare(routeB, 'es');
    });

    return collected;

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name.startsWith('.')) {
                continue;
            }

            const absolutePath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(absolutePath);
                continue;
            }

            if (!entry.isFile()) {
                continue;
            }

            if (!absolutePath.toLowerCase().endsWith('.html')) {
                continue;
            }

            const route = toProjectRoute(absolutePath);
            if (route && ignoredRoutes.has(route)) {
                continue;
            }

            collected.push(absolutePath);
        }
    }
}

function checkInternalLinks(pages) {
    const availableRoutes = new Set(pages.keys());
    const broken = [];
    let checkedTargets = 0;

    for (const [sourceRoute, html] of pages.entries()) {
        const targets = extractNavigationTargets(html);
        for (const item of targets) {
            const resolved = resolveProjectTarget(sourceRoute, item.target);
            if (!resolved) {
                continue;
            }

            checkedTargets += 1;

            if (!availableRoutes.has(resolved)) {
                broken.push({
                    sourceRoute,
                    target: item.target,
                    resolved,
                    kind: item.kind,
                });
            }
        }
    }

    return {
        totalPages: pages.size,
        checkedTargets,
        broken,
    };
}

function extractNavigationTargets(html) {
    const targets = [];

    const hrefRegex = /href\s*=\s*(["'])(.*?)\1/gi;
    let match = hrefRegex.exec(html);
    while (match) {
        const target = match[2] || '';
        if (looksLikeInternalHtmlTarget(target)) {
            targets.push({ kind: 'href', target });
        }
        match = hrefRegex.exec(html);
    }

    const assignmentRegex = /(?:window\.)?location(?:\.href)?\s*=\s*(["'])(.*?)\1/g;
    match = assignmentRegex.exec(html);
    while (match) {
        const target = match[2] || '';
        if (looksLikeInternalHtmlTarget(target)) {
            targets.push({ kind: 'location', target });
        }
        match = assignmentRegex.exec(html);
    }

    return targets;
}

function looksLikeInternalHtmlTarget(rawTarget) {
    if (typeof rawTarget !== 'string') {
        return false;
    }

    const trimmed = rawTarget.trim();
    if (!trimmed) {
        return false;
    }

    if (/^(https?:|mailto:|tel:|javascript:)/i.test(trimmed)) {
        return false;
    }

    if (trimmed.startsWith('#/')) {
        const fromHash = decodeHashRouteCandidate(trimmed);
        return Boolean(fromHash && /\.html$/i.test(fromHash));
    }

    if (trimmed.startsWith('#')) {
        return false;
    }

    const pathOnly = stripHashAndQuery(trimmed);
    if (!pathOnly) {
        return false;
    }

    const decoded = safeDecodeUri(pathOnly);
    return /\.html$/i.test(decoded);
}

function resolveProjectTarget(fromRoute, rawTarget) {
    if (!looksLikeInternalHtmlTarget(rawTarget)) {
        return null;
    }

    const target = rawTarget.trim();

    if (target.startsWith('#/')) {
        return decodeHashRouteCandidate(target);
    }

    const pathOnly = safeDecodeUri(stripHashAndQuery(target)).replace(/\\/g, '/');

    if (pathOnly.startsWith('/')) {
        return normalizeProjectRoute(pathOnly.slice(1));
    }

    const fromDir = posix.dirname(fromRoute);
    const combined = fromDir === '.' ? pathOnly : `${fromDir}/${pathOnly}`;

    return normalizeProjectRoute(combined);
}

function decodeHashRouteCandidate(hashValue) {
    const hash = hashValue.startsWith('#') ? hashValue.slice(1) : hashValue;
    if (!hash.startsWith('/')) {
        return null;
    }

    const rawPath = stripHashAndQuery(hash.slice(1));
    if (!rawPath) {
        return null;
    }

    const decoded = rawPath
        .split('/')
        .filter(Boolean)
        .map((segment) => safeDecodeURIComponent(segment))
        .join('/');

    return normalizeProjectRoute(decoded);
}

function transformPageHtml(route, html, stylesheet) {
    let transformed = html;
    transformed = inlineSharedStylesheet(transformed, stylesheet);
    transformed = rewriteLocationAssignments(transformed);
    transformed = injectPortableBridge(transformed, route);
    return transformed;
}

function inlineSharedStylesheet(html, stylesheet) {
    const linkRegex = /<link\b[^>]*href\s*=\s*["'][^"']*styles-kosmos\.css["'][^>]*>/gi;
    if (!linkRegex.test(html)) {
        return html;
    }

    return html.replace(
        linkRegex,
        `<style data-portable-inline="${STYLESHEET_NAME}">\n${stylesheet}\n</style>`
    );
}

function rewriteLocationAssignments(html) {
    const patterns = [
        /window\.location\.href\s*=\s*(["'])(.*?)\1/g,
        /window\.location\s*=\s*(["'])(.*?)\1/g,
        /\blocation\.href\s*=\s*(["'])(.*?)\1/g,
        /\blocation\s*=\s*(["'])(.*?)\1/g,
    ];

    let output = html;
    for (const pattern of patterns) {
        output = output.replace(pattern, (fullMatch, _quote, rawTarget) => {
            if (!looksLikeInternalHtmlTarget(rawTarget)) {
                return fullMatch;
            }
            return `window.__portableNavigate(${JSON.stringify(rawTarget)})`;
        });
    }

    return output;
}

function injectPortableBridge(html, route) {
    if (html.includes('data-portable-bridge="true"')) {
        return html;
    }

    const bridgeScript = buildPortableBridgeScript(route);

    if (/<\/body>/i.test(html)) {
        return html.replace(/<\/body>/i, `${bridgeScript}\n</body>`);
    }

    return `${html}\n${bridgeScript}`;
}

function buildPortableBridgeScript(route) {
    const routeLiteral = JSON.stringify(route);

    return [
        '<script data-portable-bridge="true">',
        '(function () {',
        '    "use strict";',
        '    if (window.__portableBridgeReady) {',
        '        return;',
        '    }',
        '    window.__portableBridgeReady = true;',
        `    var CURRENT_ROUTE = ${routeLiteral};`,
        '',
        '    function stripHashAndQuery(value) {',
        '        var hashIndex = value.indexOf("#");',
        '        var queryIndex = value.indexOf("?");',
        '        var endIndex = value.length;',
        '        if (hashIndex !== -1 && hashIndex < endIndex) endIndex = hashIndex;',
        '        if (queryIndex !== -1 && queryIndex < endIndex) endIndex = queryIndex;',
        '        return value.slice(0, endIndex);',
        '    }',
        '',
        '    function normalizeRoute(route) {',
        '        if (typeof route !== "string") return null;',
        '        var source = route.trim().replace(/\\\\/g, "/");',
        '        if (!source) return null;',
        '        if (source.charAt(0) === "/") source = source.slice(1);',
        '        var parts = source.split("/");',
        '        var normalized = [];',
        '        for (var i = 0; i < parts.length; i += 1) {',
        '            var part = parts[i];',
        '            if (!part || part === ".") continue;',
        '            if (part === "..") {',
        '                if (normalized.length > 0) normalized.pop();',
        '                continue;',
        '            }',
        '            normalized.push(part);',
        '        }',
        '        if (normalized.length === 0) return null;',
        '        return normalized.join("/");',
        '    }',
        '',
        '    function dirname(route) {',
        '        var normalized = normalizeRoute(route);',
        '        if (!normalized) return "";',
        '        var parts = normalized.split("/");',
        '        parts.pop();',
        '        return parts.join("/");',
        '    }',
        '',
        '    function decodeHashRoute(hashLike) {',
        '        var hash = typeof hashLike === "string" ? hashLike : "";',
        '        if (hash.charAt(0) === "#") hash = hash.slice(1);',
        '        if (!hash.startsWith("/")) return null;',
        '        var rawPath = stripHashAndQuery(hash.slice(1));',
        '        if (!rawPath) return null;',
        '        var decoded = rawPath.split("/").filter(Boolean).map(function (segment) {',
        '            try {',
        '                return decodeURIComponent(segment);',
        '            } catch (_error) {',
        '                return segment;',
        '            }',
        '        }).join("/");',
        '        return normalizeRoute(decoded);',
        '    }',
        '',
        '    function looksLikeInternalHtml(rawTarget) {',
        '        if (typeof rawTarget !== "string") return false;',
        '        var target = rawTarget.trim();',
        '        if (!target) return false;',
        '        if (/^(https?:|mailto:|tel:|javascript:)/i.test(target)) return false;',
        '        if (target.startsWith("#/")) {',
        '            var fromHash = decodeHashRoute(target);',
        '            return !!(fromHash && /\\.html$/i.test(fromHash));',
        '        }',
        '        if (target.charAt(0) === "#") return false;',
        '        var pathOnly = stripHashAndQuery(target);',
        '        if (!pathOnly) return false;',
        '        try {',
        '            pathOnly = decodeURI(pathOnly);',
        '        } catch (_error) {}',
        '        return /\\.html$/i.test(pathOnly);',
        '    }',
        '',
        '    function resolveTarget(rawTarget) {',
        '        if (!looksLikeInternalHtml(rawTarget)) return null;',
        '        var target = rawTarget.trim();',
        '        if (target.startsWith("#/")) return decodeHashRoute(target);',
        '        var pathOnly = stripHashAndQuery(target).replace(/\\\\/g, "/");',
        '        try {',
        '            pathOnly = decodeURI(pathOnly);',
        '        } catch (_error) {}',
        '        if (pathOnly.charAt(0) === "/") return normalizeRoute(pathOnly.slice(1));',
        '        var baseDir = dirname(CURRENT_ROUTE);',
        '        var combined = baseDir ? baseDir + "/" + pathOnly : pathOnly;',
        '        return normalizeRoute(combined);',
        '    }',
        '',
        '    function encodeHashRoute(route) {',
        '        return "#/" + route.split("/").map(function (segment) {',
        '            return encodeURIComponent(segment);',
        '        }).join("/");',
        '    }',
        '',
        '    window.__portableNavigate = function (rawTarget) {',
        '        var resolved = resolveTarget(rawTarget);',
        '        if (!resolved) return;',
        '',
        '        if (window.parent && window.parent !== window) {',
        '            window.parent.postMessage({',
        '                type: "portable:navigate",',
        '                target: rawTarget,',
        '                from: CURRENT_ROUTE',
        '            }, "*");',
        '            return;',
        '        }',
        '',
        '        window.location.hash = encodeHashRoute(resolved);',
        '    };',
        '',
        '    document.addEventListener("click", function (event) {',
        '        var anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;',
        '        if (!anchor) return;',
        '        var href = anchor.getAttribute("href");',
        '        if (!resolveTarget(href)) return;',
        '        event.preventDefault();',
        '        window.__portableNavigate(href);',
        '    }, true);',
        '})();',
        '</script>',
    ].join('\n');
}

function buildPortableShell({ pages, entryRoute, generatedAtIso }) {
    const serializedPages = serializeForInlineScript(pages);
    const entryLiteral = JSON.stringify(entryRoute);
    const generatedAtLiteral = JSON.stringify(generatedAtIso);

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kosmos - Demo Portable</title>
    <meta name="portable-generated-at" content=${generatedAtLiteral}>
    <style>
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
            background: #0f172a;
            overflow: hidden;
        }
        #portable-frame {
            width: 100%;
            height: 100%;
            border: 0;
            display: block;
            background: #ffffff;
        }
    </style>
</head>
<body>
    <iframe id="portable-frame" title="Kosmos Demo Portable"></iframe>

    <script>
    (function () {
        "use strict";

        var PAGES = ${serializedPages};
        var ENTRY_ROUTE = ${entryLiteral};
        var hasOwn = Object.prototype.hasOwnProperty;
        var frame = document.getElementById("portable-frame");
        var currentRoute = "";

        function stripHashAndQuery(value) {
            var hashIndex = value.indexOf("#");
            var queryIndex = value.indexOf("?");
            var endIndex = value.length;
            if (hashIndex !== -1 && hashIndex < endIndex) endIndex = hashIndex;
            if (queryIndex !== -1 && queryIndex < endIndex) endIndex = queryIndex;
            return value.slice(0, endIndex);
        }

        function safeDecodeUri(value) {
            try {
                return decodeURI(value);
            } catch (_error) {
                return value;
            }
        }

        function normalizeRoute(route) {
            if (typeof route !== "string") return null;
            var source = route.trim().replace(/\\\\/g, "/");
            if (!source) return null;
            if (source.charAt(0) === "/") source = source.slice(1);

            var parts = source.split("/");
            var normalized = [];

            for (var i = 0; i < parts.length; i += 1) {
                var part = parts[i];
                if (!part || part === ".") continue;
                if (part === "..") {
                    if (normalized.length > 0) normalized.pop();
                    continue;
                }
                normalized.push(part);
            }

            if (normalized.length === 0) return null;
            return normalized.join("/");
        }

        function dirname(route) {
            var normalized = normalizeRoute(route);
            if (!normalized) return "";
            var parts = normalized.split("/");
            parts.pop();
            return parts.join("/");
        }

        function encodeHashRoute(route) {
            return "#/" + route.split("/").map(function (segment) {
                return encodeURIComponent(segment);
            }).join("/");
        }

        function decodeHashRoute(hashLike) {
            if (typeof hashLike !== "string") return null;
            var hash = hashLike.charAt(0) === "#" ? hashLike.slice(1) : hashLike;
            if (!hash.startsWith("/")) return null;

            var rawPath = stripHashAndQuery(hash.slice(1));
            if (!rawPath) return null;

            var decoded = rawPath
                .split("/")
                .filter(Boolean)
                .map(function (segment) {
                    try {
                        return decodeURIComponent(segment);
                    } catch (_error) {
                        return segment;
                    }
                })
                .join("/");

            return normalizeRoute(decoded);
        }

        function resolveNavigationTarget(fromRoute, rawTarget) {
            if (typeof rawTarget !== "string") return null;

            var target = rawTarget.trim();
            if (!target) return null;

            if (target.startsWith("#/")) {
                return decodeHashRoute(target);
            }

            if (/^(https?:|mailto:|tel:|javascript:)/i.test(target)) {
                return null;
            }

            if (target.charAt(0) === "#") {
                return null;
            }

            var pathOnly = safeDecodeUri(stripHashAndQuery(target)).replace(/\\\\/g, "/");
            if (!/\\.html$/i.test(pathOnly)) {
                return null;
            }

            if (pathOnly.charAt(0) === "/") {
                return normalizeRoute(pathOnly.slice(1));
            }

            var baseDir = dirname(fromRoute || ENTRY_ROUTE);
            var combined = baseDir ? baseDir + "/" + pathOnly : pathOnly;
            return normalizeRoute(combined);
        }

        function escapeHtml(text) {
            return String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        function buildMissingPage(requestedRoute, fromRoute) {
            var safeRequested = escapeHtml(requestedRoute || "(ruta vacia)");
            var safeFrom = escapeHtml(fromRoute || "(sin origen)");
            var backHash = encodeHashRoute(ENTRY_ROUTE);

            return [
                "<!DOCTYPE html>",
                "<html lang=\\"es\\">",
                "<head>",
                "  <meta charset=\\"UTF-8\\">",
                "  <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">",
                "  <title>Ruta no encontrada</title>",
                "  <style>",
                "    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }",
                "    .wrap { max-width: 720px; margin: 0 auto; padding: 64px 24px; }",
                "    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 8px 24px rgba(15,23,42,0.08); }",
                "    h1 { margin: 0 0 14px 0; font-size: 24px; }",
                "    p { margin: 0 0 10px 0; line-height: 1.6; color: #334155; }",
                "    code { background: #e2e8f0; border-radius: 6px; padding: 2px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }",
                "    a { display: inline-block; margin-top: 18px; color: #ffffff; background: #0f172a; text-decoration: none; border-radius: 8px; padding: 10px 16px; font-weight: 600; }",
                "  </style>",
                "</head>",
                "<body>",
                "  <div class=\\"wrap\\">",
                "    <div class=\\"card\\">",
                "      <h1>No se encontro la pantalla solicitada</h1>",
                "      <p>Ruta pedida: <code>" + safeRequested + "</code></p>",
                "      <p>Navegacion desde: <code>" + safeFrom + "</code></p>",
                "      <a href=\\"" + backHash + "\\" target=\\"_parent\\">Volver al indice principal</a>",
                "    </div>",
                "  </div>",
                "</body>",
                "</html>"
            ].join("");
        }

        function renderRoute(route, options) {
            var opts = options || {};
            var normalized = normalizeRoute(route) || ENTRY_ROUTE;
            var exists = hasOwn.call(PAGES, normalized);

            if (exists) {
                frame.srcdoc = PAGES[normalized];
            } else {
                frame.srcdoc = buildMissingPage(normalized, opts.fromRoute || currentRoute || "");
            }

            currentRoute = normalized;

            if (opts.updateHash) {
                var desiredHash = encodeHashRoute(normalized);
                if (window.location.hash !== desiredHash) {
                    window.location.hash = desiredHash;
                }
            }
        }

        function routeFromHash() {
            var decoded = decodeHashRoute(window.location.hash);
            return decoded || ENTRY_ROUTE;
        }

        function syncFromHash() {
            var targetRoute = routeFromHash();
            if (targetRoute === currentRoute) {
                return;
            }
            renderRoute(targetRoute, { updateHash: false, fromRoute: currentRoute || ENTRY_ROUTE });
        }

        window.addEventListener("hashchange", syncFromHash);

        window.addEventListener("message", function (event) {
            var data = event.data;
            if (!data || data.type !== "portable:navigate") {
                return;
            }

            var fromRoute = normalizeRoute(typeof data.from === "string" ? data.from : "") || currentRoute || ENTRY_ROUTE;
            var resolved = resolveNavigationTarget(fromRoute, data.target);

            if (!resolved) {
                return;
            }

            renderRoute(resolved, { updateHash: true, fromRoute: fromRoute });
        });

        if (window.location.hash) {
            syncFromHash();
        } else {
            renderRoute(ENTRY_ROUTE, { updateHash: true, fromRoute: ENTRY_ROUTE });
        }
    })();
    </script>
</body>
</html>`;
}

function printCheckReport(report) {
    console.log(`[check] Pantallas: ${report.totalPages}`);
    console.log(`[check] Enlaces internos HTML analizados: ${report.checkedTargets}`);

    if (report.broken.length === 0) {
        console.log('[check] OK: 0 enlaces internos rotos.');
        return;
    }

    console.log(`[check] ERROR: ${report.broken.length} enlaces internos rotos.`);

    const maxToPrint = 100;
    for (let i = 0; i < report.broken.length && i < maxToPrint; i += 1) {
        const item = report.broken[i];
        console.log(
            `  - ${item.sourceRoute} [${item.kind}] -> "${item.target}" resuelve a "${item.resolved}" (no existe)`
        );
    }

    if (report.broken.length > maxToPrint) {
        console.log(`  ... y ${report.broken.length - maxToPrint} mas`);
    }
}

function serializeForInlineScript(value) {
    return JSON.stringify(value)
        .replace(/</g, '\\u003C')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}

function stripHashAndQuery(value) {
    const hashIndex = value.indexOf('#');
    const queryIndex = value.indexOf('?');
    let endIndex = value.length;

    if (hashIndex !== -1 && hashIndex < endIndex) {
        endIndex = hashIndex;
    }
    if (queryIndex !== -1 && queryIndex < endIndex) {
        endIndex = queryIndex;
    }

    return value.slice(0, endIndex);
}

function normalizeRouteArg(input, flagName) {
    if (typeof input !== 'string' || !input.trim()) {
        fail(`${flagName} requiere una ruta valida.`);
    }

    if (path.isAbsolute(input)) {
        const route = toProjectRoute(input);
        if (!route) {
            fail(`${flagName} debe apuntar a un HTML dentro del proyecto.`);
        }
        return route;
    }

    const normalized = normalizeProjectRoute(input);
    if (!normalized) {
        fail(`${flagName} contiene una ruta invalida: ${input}`);
    }
    return normalized;
}

function normalizeProjectRoute(input) {
    if (typeof input !== 'string') {
        return null;
    }

    const stripped = stripHashAndQuery(input.trim());
    if (!stripped) {
        return null;
    }

    const asPosix = stripped.replace(/\\/g, '/');
    const withoutLeadingSlash = asPosix.startsWith('/') ? asPosix.slice(1) : asPosix;
    const normalized = posix.normalize(withoutLeadingSlash);

    if (!normalized || normalized === '.') {
        return null;
    }

    if (normalized === '..' || normalized.startsWith('../')) {
        return null;
    }

    return normalized;
}

function toProjectRoute(absolutePath) {
    const relative = path.relative(cwd, absolutePath);
    if (!relative || relative === '') {
        return null;
    }
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
        return null;
    }
    return normalizeProjectRoute(relative);
}

function isGeneratedPortableHtml(html) {
    return (
        html.includes('id="portable-frame"') &&
        html.includes('var PAGES =') &&
        html.includes('portable-generated-at')
    );
}

function safeDecodeUri(value) {
    try {
        return decodeURI(value);
    } catch (_error) {
        return value;
    }
}

function safeDecodeURIComponent(value) {
    try {
        return decodeURIComponent(value);
    } catch (_error) {
        return value;
    }
}

function fail(message) {
    console.error(`[portable] ${message}`);
    process.exit(1);
}
