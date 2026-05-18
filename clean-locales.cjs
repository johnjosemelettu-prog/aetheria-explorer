const fs = require('fs');
const path = require('path');

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const langs = fs.readdirSync(localesDirSrc).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));

const esTranslations = {
  "auto_new_tier_1_elite__apex_s_5023": "Élite Nivel 1: Soberanía Apex",
  "auto_global_travelers_clu_149": "Club de Viajeros Globales",
  "auto_surpassing_basic_lux_148": "Superando el lujo básico. Desbloquea viajes globales absolutamente sin fricción con telemetría de vestuario predictiva, túnel biométrico, secuestro de aviación algorítmica y escudo diplomático soberano.",
  "auto_new_wardrobe_teleport_5020": "Teletransporte de Vestuario",
  "auto_new_aviation_node_swap_5019": "Intercambio de Nodos de Aviación",
  "auto_new_biometric_tunnel_5018": "Túnel Biométrico",
  "auto_new_silent_mode_5017": "Modo Silencioso",
  "auto_new_crisis_matrix_5016": "Matriz de Crisis",
  "auto_new_circadian_sync_5015": "Sincronización Circadiana",
  "auto_predictive_logistics_147": "Logística Predictiva",
  "auto_global_wardrobe_tele_146": "Teletransporte de Vestuario Global",
  "auto_eradicate_luggage__w_145": "Erradica el equipaje. Mantenemos tu perfil de sastrería biométrico 3D exacto. Al desplegarte en un destino, nuestros socios regionales de lujo seleccionan y abastecen el armario de tu hotel con prendas perfectas para el clima en tus medidas precisas antes de tu llegada.",
  "auto_active_profile_144": "Perfil Activo",
  "auto_alexander_s_digital__143": "Gemelo Digital de Alexander",
  "auto_measurements_synced_142": "Medidas Sincronizadas",
  "auto_destination__dubai___141": "Destino",
  "auto_climate__34_c_arid_140": "Clima: 34°C Árido",
  "auto_new_brunello_cucinelli_l_5013": "Traje de Lino Brunello Cucinelli (IT 48)",
  "auto_new_loro_piana_summer_wa_5012": "Mocasines Loro Piana Summer Walk (EU 43)",
  "auto_new_tom_ford_evening_att_5011": "Atuendo de Noche Tom Ford",
  "auto_awaiting_deployment_137": "Esperando Despliegue",
  "auto_new_deploy_local_wardrob_5009": "Desplegar Paquete de Vestuario Local"
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const lang of langs) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let changed = false;
        
        if (content.auto) {
          for (const key in content.auto) {
            let val = content.auto[key];
            if (typeof val === 'string') {
              const prefix = `[${lang}] `;
              if (val.startsWith(prefix)) {
                content.auto[key] = val.substring(prefix.length);
                changed = true;
              }
            }
          }
        }
        
        if (lang === 'es' && content.auto) {
          for (const [key, trans] of Object.entries(esTranslations)) {
            if (content.auto[key] !== trans) {
              content.auto[key] = trans;
              changed = true;
            }
          }
        }
        
        if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
          console.log(`Updated ${filePath}`);
        }
      }
    }
  }
}

run();
