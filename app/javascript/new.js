console.log('読み込み確認')
document.addEventListener('turbo:load', () => {
  console.log('Turbo load event fired'); // DOMContentLoadedイベントが発火したことを確認
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const LIFF_ID = gon.user_key;
  liff.init({
    liffId: LIFF_ID,
    withLoginOnExternalBrowser: true
  })
  liff.ready.then(() => {
    console.log('LIFF is ready'); // LIFFが準備完了したことを確認
    const idToken = liff.getIDToken()
    const body = `idToken=${idToken}`
    const request = new Request('/user', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'X-CSRF-Token': token
      },
      method: 'POST',
      body: body
    });
    console.log('Sending request'); // リクエストを送信することを確認
    fetch(request)
      .then(response => {
        console.log('Received response'); // レスポンスを受け取ったことを確認
        return response.json();
      })
      .then(data => {
        console.log('Received data', data); // データを受け取ったことと、その内容を確認
        data_id = data
      })
      .then(() => {
        console.log('Redirecting'); // リダイレクトすることを確認
        window.location = '/after_login'
      })
  })
})
