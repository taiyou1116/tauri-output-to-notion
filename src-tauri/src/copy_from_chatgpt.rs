pub fn run(text: String) -> Vec<String> {
    // textはフロントから受け取る

    // 文章を "■" で分割
    let split_texts: Vec<&str> = text.split("■").collect();

    // 最初の要素は空なので、スキップ
    let mut results: Vec<String> = Vec::new();

    let mut i = 0;
    for chunk in split_texts.iter().skip(1) {
        let lines: Vec<&str> = chunk.lines().collect();
        i += 1;
        // 本文（タイトル以降の行）を取得して結合
        let content = lines[1..].join("\n").trim().to_string();

        results.push(content);
    }
    println!("{}", i);
    results
}
