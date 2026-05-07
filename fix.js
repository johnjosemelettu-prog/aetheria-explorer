
const fs = require('fs');
const path = require('path');

function fixFiles() {
    // Fix for src/main.tsx
    const mainTsxPath = 'src/main.tsx';
    if (fs.existsSync(mainTsxPath)) {
        let mainTsxContent = fs.readFileSync(mainTsxPath, 'utf8');
        if (mainTsxContent.includes("import './lib/i18n';") && !mainTsxContent.match(/import '\.\/lib\/i18n';\s*ReactDOM\.createRoot/)) {
            mainTsxContent = mainTsxContent.replace("import './lib/i18n';", '');
            mainTsxContent = mainTsxContent.replace(
                /ReactDOM\.createRoot\(document\.getElementById\('root'\)!\)\.render/,
                "import './lib/i18n';\n\nReactDOM.createRoot(document.getElementById('root')!).render"
            );
            fs.writeFileSync(mainTsxPath, mainTsxContent);
            console.log('Fixed: Moved i18n import to the top of src/main.tsx');
        }
    }

    // Fix for src/App.tsx
    const appTsxPath = 'src/App.tsx';
    if (fs.existsSync(appTsxPath)) {
        let appTsxContent = fs.readFileSync(appTsxPath, 'utf8');
        if (!appTsxContent.includes('<React.Suspense fallback="loading">')) {
            appTsxContent = appTsxContent.replace(
                'return (',
                'return (\n    <React.Suspense fallback="loading">'
            );
            appTsxContent = appTsxContent.replace(
                '</BrowserRouter>',
                '</BrowserRouter>\n    </React.Suspense>'
            );
            fs.writeFileSync(appTsxPath, appTsxContent);
            console.log('Fixed: Wrapped BrowserRouter in Suspense component in src/App.tsx');
        }
    }

    // Fix for AIGeneratedTravelThemedPickupLines.tsx
    const pickupLinesPath = 'src/components/AIGeneratedTravelThemedPickupLines.tsx';
    if (fs.existsSync(pickupLinesPath)) {
        let pickupLinesContent = fs.readFileSync(pickupLinesPath, 'utf8');
        if (pickupLinesContent.includes("'I've been searching")) {
             pickupLinesContent = pickupLinesContent.replace(
                "'I've been searching for you all my life... Are you a hidden gem?'",
                "`I've been searching for you all my life... Are you a hidden gem?`"
            );
            fs.writeFileSync(pickupLinesPath, pickupLinesContent);
            console.log('Fixed: String literal in AIGeneratedTravelThemedPickupLines.tsx');
        }
    }
}

fixFiles();
