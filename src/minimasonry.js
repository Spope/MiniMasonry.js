var MiniMasonry = function(conf) {
    this._sizes = [];
    this._columns = [];
    this._container = null;
    this._count = null;
    this._width = 0;
    this._gutter = 0;

    this._resizeTimeout = null,

    this.conf = {
        baseWidth: 255,
        gutter: 10,
        container: null,
        minify: true,
        ultimateGutter: 5
    };

    this.init(conf);

    return this;
}

MiniMasonry.prototype.init = function(conf) {
    for (var i in this.conf) {
        if (conf[i] != undefined) {
            this.conf[i] = conf[i];
        }
    }
    this._container = document.querySelector(this.conf.container);
    if (!this._container) {
        throw new Error('Container not found or missing');
    }
    window.addEventListener("resize", this.resizeThrottler.bind(this));

    this.layout();
};

MiniMasonry.prototype.reset = function() {
    this._sizes   = [];
    this._columns = [];
    this._count   = null;
    this._width   = this._container.clientWidth;
    var minWidth  = this.conf.baseWidth;
    if (this._width < minWidth) {
        this._width = minWidth;
        this._container.style.minWidth = minWidth + 'px';
    }
    this._gutter = this.conf.gutter;
    if (this.getCount() == 1) {
        // Set ultimate gutter when only one column is displayed
        this._gutter = this.conf.ultimateGutter;
        this._count = 1;
    }

    if (this._width < (this.conf.baseWidth + (2 * this._gutter))) {
        // Remove gutter when screen is to low
        this._gutter = 0;
    }
};

MiniMasonry.prototype.getCount = function() {
    return Math.floor((this._width - this._gutter) / (this.conf.baseWidth + this._gutter));
}

MiniMasonry.prototype.layout =  function() {
    if (!this._container) {
        console.error('Container not found');
        return;
    }
    this.reset();

    //Computing columns width
    if (this._count == null) {
        this._count = this.getCount();
    }
    var width   = ((this._width - this._gutter) / this._count) - this._gutter;

    for (var i = 0; i < this._count; i++) {
        this._columns[i] = 0;
    }


    //Saving children real heights
    var children = this._container.querySelectorAll(this.conf.container + ' > *');
    for (var k = 0;k< children.length; k++) {
        this._sizes[k] = children[k].clientHeight;
    }

    //If more columns than children
    var initialLeft = this._gutter;
    if (this._count > this._sizes.length) {
        initialLeft = (((this._width - (this._sizes.length * width)) - this._gutter) / 2) - this._gutter;
    }

    //Computing position of children
    for (var index = 0;index < children.length; index++) {
        var shortest = this.conf.minify ? this.getShortest() : this.getNextColumn(index);

        children[index].style.width = Math.round(width) + 'px';
        var x = initialLeft + ((width + this._gutter) * (shortest));
        var y = this._columns[shortest];


        children[index].style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';

        this._columns[shortest]  += this._sizes[index] + (this._count > 1 ? this._gutter : this.conf.ultimateGutter);//margin-bottom
    }

    this._container.style.height = this._columns[this.getLongest()] + 'px';
};

MiniMasonry.prototype.getNextColumn = function(index) {
    return index % this._columns.length;
};

MiniMasonry.prototype.getShortest = function() {
    var shortest = 0;
    for (var i = 0; i < this._count; i++) {
        if (this._columns[i] < this._columns[shortest]) {
            shortest = i;
        }
    }

    return shortest;
};

MiniMasonry.prototype.getLongest = function() {
    var longest = 0;
    for (var i = 0; i < this._count; i++) {
        if (this._columns[i] > this._columns[longest]) {
            longest = i;
        }
    }

    return longest;
};

MiniMasonry.prototype.resizeThrottler = function() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !this._resizeTimeout ) {

        this._resizeTimeout = setTimeout(function() {
            this._resizeTimeout = null;
            //IOS Safari throw random resize event on scroll, call layout only if size has changed
            if (this._container.clientWidth != this._width) {
                this.layout();
            }
           // The actualResizeHandler will execute at a rate of 15fps
        }.bind(this), 66);
    }
}
