/* QuiltMath engine - pure functions, no DOM. Honest quilting math.
   Constants stated in the UI: 0.5 in total seam allowance per block, 42 in
   usable fabric width, 36 in per yard, 15% cutting waste, backing overhang
   4 in per side, binding strips 2.5 in wide plus 12 in of corner allowance. */
var QuiltMath = (function () {
  function blocksFor(widthIn, lengthIn, blockIn) {
    var cols = Math.ceil(widthIn / blockIn);
    var rows = Math.ceil(lengthIn / blockIn);
    return { cols: cols, rows: rows, count: cols * rows, actualW: cols * blockIn, actualL: rows * blockIn };
  }
  function fabricYards(blocks, blockIn, seamIn) {
    var cut = blockIn + seamIn;
    var totalSq = blocks * cut * cut;
    return totalSq / (42 * 36) * 1.15;
  }
  function backingYards(widthIn, lengthIn) {
    var bw = widthIn + 8;
    var bl = lengthIn + 8;
    var lengths = bw <= 42 ? 1 : 2;
    return { widths: lengths, yards: lengths * bl / 36, note: lengths === 1 ? 'one width, no center seam' : 'two widths - a center seam, press it open' };
  }
  function binding(widthIn, lengthIn, stripW) {
    var perim = 2 * (widthIn + lengthIn) + 12;
    var strips = Math.ceil(perim / 42);
    return { perimeter: perim, strips: strips, yards: strips * stripW / 36 };
  }
  function sizeVerdict(name) {
    if (name === 'baby') return 'Baby quilt (36x52) - the weekend project that teaches you everything gently.';
    if (name === 'throw') return 'Throw (50x65) - the couch classic; big enough to matter, small enough to finish.';
    if (name === 'twin') return 'Twin (66x90) - a real bed quilt; your basting knees will know about it.';
    if (name === 'queen') return 'Queen (90x100) - a commitment measured in months and bobbins.';
    return 'King (104x100) - epic; consider whether the recipient has done anything to deserve this.';
  }
  function quiltCost(fabricYd, fabricPrice, backingYd, backingPrice, battingCost, miscCost) {
    return fabricYd * fabricPrice + backingYd * backingPrice + battingCost + miscCost;
  }
  function costVerdict(total) {
    if (total <= 60) return 'Under $60 - cheaper than the store quilt, and this one has a person in it.';
    if (total <= 130) return 'Handmade-quilt economics - the materials rival a mid-range store quilt; the hours are the gift.';
    return 'Heirloom territory - expensive fabric choices; just call it an investment piece and move on.';
  }
  return {
    blocksFor: blocksFor, fabricYards: fabricYards, backingYards: backingYards, binding: binding,
    sizeVerdict: sizeVerdict, quiltCost: quiltCost, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = QuiltMath;
