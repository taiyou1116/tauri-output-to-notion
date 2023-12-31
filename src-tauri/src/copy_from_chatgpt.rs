pub fn run(text: String) -> Result<Vec<String>, String> {
    // textはフロントから受け取る

    // 文章を "■" で分割
    let split_texts: Vec<&str> = text.split("■").collect();

    // 最初の要素は空なので、スキップ
    let mut results: Vec<String> = Vec::new();

    for chunk in split_texts.iter().skip(1) {
        let lines: Vec<&str> = chunk.lines().collect();
        // 本文（タイトル以降の行）を取得して結合
        let content = lines[1..].join("\n").trim().to_string();

        results.push(content);
    }
    if results.len() != 8 {
        return Err(format!("i is not 8, it's {}", results.len()));
    }
    Ok(results)
}
