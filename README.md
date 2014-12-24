hook-email-to-post-slack
========================

email 2 slack


### setup
imapで接続してメールを取得するアカウントのID・PWを入力してください。

```
export EMAIL_ACCOUNT={あなたのemailアカウント}
export EMAIL_PASSWORD={あなたのemailパスワード}
export SLACK_DOMAIN={slackのチーム名}
export SLACK_TOKEN={slackのトークン}
export SLACK_CHANNEL={slackのpostしたいチャンネル}
```

gmailだとbotとして弾かれたので簡易的にセキュリティレベルを下げて実行しました
