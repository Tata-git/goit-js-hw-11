export function renderGallery(images, container) {
  const imageCard = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => /* html */ `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${likes}</span> 
    </p>
    <p class="info-item">
      <b>Views</b><span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b><span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${downloads}</span>
    </p>
  </div>
</div>
    `
    )
    .join('');
  container.insertAdjacentHTML('beforeend', imageCard);
}
