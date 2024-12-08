export default function createMarkUp(array) {
  return array
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
            <a href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}"></a>
            <div class="gallery-info">
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Likes</p>
                    <p class="gallery-info-div-value">${likes}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Views</p>
                    <p class="gallery-info-div-value">${views}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Comments</p>
                    <p class="gallery-info-div-value">${comments}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Downloads</p>
                    <p class="gallery-info-div-value">${downloads}</p>
                </div>
            </div>
        </li>
    `;
      }
    )
    .join('');
}
