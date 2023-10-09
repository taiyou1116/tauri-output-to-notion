// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod copy_from_chatgpt;
mod notion_json_template;
mod reqwest_to_notion;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            config::save_secret_key_and_db_id,
            config::verify_api_key_on_startup,
            reqwest_to_notion::run
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
