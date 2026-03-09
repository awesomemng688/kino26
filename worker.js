import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  try {
    // React-ийн static файлуудыг serve хийх
    return await getAssetFromKV(event)
  } catch (e) {
    // React-ийн SPA-д зориулсан fallback
    const index = await getAssetFromKV(event, { mapRequestToAsset: req => new Request('/index.html', req) })
    return index
  }
}
