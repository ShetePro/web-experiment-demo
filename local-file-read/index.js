
document.body.onload = () => {
  const folderBtn = document.getElementById('openFolder')
  const aside = document.getElementById('sideBar')
  const codeView = document.getElementById('codeView')
  let folderHandle;
  
  folderBtn.addEventListener('click', () => {
    selectFolder()
  })
  async function selectFolder () {
    folderHandle = await window.showDirectoryPicker()
    const data = []
    for await (const item of folderHandle) {
      let file;
      if (item[1].kind === 'directory') {
        file = createFolder(item[1])
        file.dataset.type = 'directory'
      }else {
        file = document.createElement('span')
        file.innerText = item[0]
      }
      file.dataset.name = item[0]
      file.classList.add('file-item')
      file.addEventListener('click', (e) => {
        fileClick(e, item[1])
      })
      aside.append(file)
      data.push(item)
    }
    console.log(data)
  }
  
  function createFolder (data) {
    const folder = document.createElement('div')
    const arrow = document.createElement('i')
    const fileName = document.createElement('span')
    arrow.textContent = '>'
    fileName.textContent = data.name
    folder.append(arrow, fileName)
    return folder
  }
  
  async function fileClick (e, handle) {
    const directory = e.target.dataset.type === 'directory'
    const fileName = e.target.dataset.name
    if (directory) {
      console.log(fileName, '2222')
    }else {
      const content = await handle.getFile()
      const text = await getFileContent(content)
      const highlightedCode = hljs.highlightAuto(
       text,
      ).value
      codeView.innerHTML = `${highlightedCode}`
    }
  }
  
  async function getFileContent (file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        resolve(e.target.result)
      }
      fileReader.readAsText(file)
    })
  }
}

