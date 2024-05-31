on run argv
  tell application "Terminal"
    activate
    do script "cd " & quoted form of item 1 of argv & " ; cd ui-spa && npm run start"
  end tell
end run