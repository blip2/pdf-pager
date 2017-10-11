// The workerSrc property shall be specified.
PDFJS.workerSrc = 'js/pdf.worker.min.js';

var pagedpdfHandler = {
  pdfDoc: null,
  pageNum: 1,
  pageRendering: false,
  pageNumPending: null,
  scale: 1,
  canvas: null,

  renderPage: function(num) {
    this.pageRendering = true;
    var handler = this;
    this.pdfDoc.getPage(num).then(function(page) {
      var scale = Math.min(handler.canvas.width / page.getViewport(1.0).width, handler.canvas.height / page.getViewport(1.0).height)
      var viewport = page.getViewport(scale);
      handler.canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: handler.ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(function() {
        handler.pageRendering = false;
        if (handler.pageNumPending !== null) {
          // New page rendering is pending
          handler.renderPage(handler.pageNumPending);
          handler.pageNumPending = null;
        }
      });
    });
  },

  queueRenderPage: function(num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  },

  onPrevPage: function() {
    if (this.pageNum <= 1) {
      this.pageNum = this.pdfDoc.numPages;
    } else {
      this.pageNum--;
    }
    this.queueRenderPage(this.pageNum);
  },

  onNextPage: function() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      this.pageNum = 1;
    } else {
      this.pageNum++;
    }
    this.queueRenderPage(this.pageNum);
  },

  init: function(canvas, url) {
      this.canvas = canvas[0];
      this.ctx = this.canvas.getContext('2d');
      var handler = this;
      canvas.siblings().filter('.prev').click(function() { handler.onPrevPage(); });
      canvas.siblings().filter('.next').click(function() { handler.onNextPage(); });
      PDFJS.getDocument(url).then(function(pdfDoc_) {
        handler.pdfDoc = pdfDoc_;
        handler.renderPage(handler.pageNum);
      });
  },
}
