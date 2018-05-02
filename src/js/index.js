class InsertList {
  constructor() {
    this.$detailList = $('.js-detailList');
    this.$prevBtn = $('.js-modalContents__prev');
    this.$nextBtn = $('.js-modalContents__next');

    this.init();
  }
  init() {
    this.insertBookList();
    this.bindEvent();
  }

  bindEvent() {
    $(document).on('click', '.js-detailLink', e => {
      e.preventDefault();
      this.currentIndex = $(e.currentTarget).data('id');
      this.changeCurrentClass(this.currentIndex);
      this.openModal();
    });

    $(document).on('click', '.js-close', () => this.closeModal());
    this.$prevBtn.on('click', () => this.changeCurrentClass(this.currentIndex - 1));
    this.$nextBtn.on('click', () => this.changeCurrentClass(this.currentIndex + 1));
  }

  openModal() {
    $('.js-modal').fadeIn();
  }
  closeModal() {
    $('.js-modal').fadeOut();
  }

  getData(apiUrl) {
    const dataUrl = apiUrl;
    return $.ajax({
      url: dataUrl,
      type: 'GET',
      dataType: 'json',
    });
  }

  insertBookList() {
    this.getData('http://localhost:8080/api/books').done(data => {
      this.createBookList(data);
    });
  }

  insertBookDetail(bookId) {
    this.getData(`http://localhost:8080/api/book/${bookId}`).done(data => this.createDetailDom(data));
  }

  createDetailDom(data) {
    $('.js-detailList__item').removeClass('current');
    this.$detailList.append(`<li class="detailList__item js-detailList__item current" data-index="${data.id}">
      <div class="detailList__item__inner">
        <img src="${data.thumbnail}" width="173" class="detailList__item__img">
        <div class="detailList__item__dataWrap">
          <div>${data.subject}</div>
          <div>${data.author}</div>
          <span>${data.category}</span>
          <span>${data.releaseDate}</span>
        </div>
      </div>
        <p>${data.description}</p>
      </li>`);
  }

  changeCurrentClass(index) {
    if (this.itemLength === index) {
      index = 0;
    } else if (index < 0) {
      index = this.itemLength - 1;
    }

    if (!$(`[data-index="${index}"]`).length) {
      this.insertBookDetail(index);
    }

    $('.js-detailList__item').removeClass('current');
    $(`[data-index="${index}"]`).addClass('current');
    this.currentIndex = index;
  }

  createBookList(data) {
    let listValue = '';
    data.forEach(element => {
      listValue += `<li class="bookList__item">
      <p class="bookList__item__title">${element.subject}</p>
      <div class="bookList__item__inner">
          <p class="bookList__item__author"><span>作者:</span>${element.author}</p>
          <span class="bookList__item__category">${element.category}</span>
          <span class="bookList__item__date">${element.releaseDate}</span>
          <p><a href="" class="js-detailLink" data-id="${element.id}">詳細を表示</a></p>
      </div>
    </li>`;
    });
    $('.js-bookList').append(listValue);
    this.itemLength = $('.bookList__item').length;
  }
}
new InsertList();
