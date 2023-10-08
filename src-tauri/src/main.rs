// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod copy_from_chatgpt;
mod notion_json_template;
mod reqwest_to_notion;

#[tokio::main]
async fn main() {
    let input = copy_from_chatgpt::run();
    match reqwest_to_notion::run(input).await {
        Ok(_) => {
            println!("OK");
        }
        Err(e) => {
            println!("{}", e);
        }
    }
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
