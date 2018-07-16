import { ip } from './local'
export const onSuccess = (that, e) => {
  let _this = that
  _this.fullscreenLoading = false
  let url = ip + e.result.filePath
  console.log('url', url)
  if (url != null && url.length > 0) {
    let value = url
    _this.addRange = _this.$refs.myEdit.quill.getSelection()
    console.log('value', value, _this.addRange.index)
    _this.$refs.myEdit.quill.insertEmbed(_this.addRange !== null
      ? _this.addRange.index : 0, _this.uploadType, value)
  } else {
    _this.$message.error(`${_this.uploadType}插入失败`)
  }
  _this.$refs['upload'].clearFiles()
}
