use dotenv::from_path;
use std::env;
use std::io::Write;
use std::path::PathBuf;

const BUNDLE_IDENTIFIER: &str = "com.taiyou.tauri-output-to-notion";

fn get_data_dir() -> PathBuf {
    let path = tauri::api::path::data_dir()
        .unwrap_or_else(|| std::path::PathBuf::from("./"))
        .join(BUNDLE_IDENTIFIER);

    if !path.exists() {
        std::fs::create_dir(&path).expect("error");
    }

    path
}

// フロントからシークレットキーを設定する
#[tauri::command]
pub async fn save_secret_key_and_db_id(secret_key: String, db_id: String) -> Result<(), String> {
    let env_file_path = get_data_dir().join(".env");

    let mut file = std::fs::File::create(env_file_path).expect("envファイルの作成に失敗しました");
    writeln!(file, "TOKEN={}\nDBID={}", &secret_key, &db_id).expect("書き込みに失敗しました");
    verify_api_key_on_startup().await?;
    Ok(())
}

// アプリ開始時に.envにキーが設定されているか
#[tauri::command]
pub async fn verify_api_key_on_startup() -> Result<(), String> {
    let env_file_path = get_data_dir().join(".env");

    if let Err(e) = from_path(env_file_path) {
        return Err(e.to_string());
    }

    let _token = env::var("TOKEN").map_err(|e| e.to_string())?;
    let _db_id = env::var("DBID").map_err(|e| e.to_string())?;
    Ok(())
}
