import { dialog, shell } from 'electron'
import { mainWindow } from '../main'

import * as fs from 'fs'
import * as path from 'path'

export function selectDirectory(file: string) {
  const result = dialog.showSaveDialogSync(
    mainWindow as Electron.BrowserWindow,
    {
      filters: [{ name: 'Default', extensions: ['xlsx'] }],
      title: file
    }
  )

  if (result !== undefined) {
    fs.copyFile(
      path.resolve(__dirname, '..', 'import', file),
      result + '.xlsx',
      err => {
        if (err) throw err
      }
    )

    setTimeout(() => {
      shell.openPath(result + '.xlsx')
    }, 300)
  }
}
