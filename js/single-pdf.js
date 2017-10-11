/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

if (!PDFJS.PDFSinglePageViewer || !PDFJS.getDocument) {
  alert('Please build the pdfjs-dist library using\n' +
        '  `gulp dist-install`');
}

PDFJS.workerSrc = 'js/pdf.worker.min.js';

var singlepdfHandler = {
  init: function(canvas, url) {
    var container = canvas[0];
    var pdfLinkService = new PDFJS.PDFLinkService();
    var pdfSinglePageViewer = new PDFJS.PDFSinglePageViewer({
      container: container,
      linkService: pdfLinkService,
    });
    pdfLinkService.setViewer(pdfSinglePageViewer);
    container.addEventListener('pagesinit', function () {
      pdfSinglePageViewer.currentScaleValue = '1';
    });
    PDFJS.getDocument(url).then(function (pdfDocument) {
      pdfSinglePageViewer.setDocument(pdfDocument);
      pdfLinkService.setDocument(pdfDocument, null);
    });
  }
}
