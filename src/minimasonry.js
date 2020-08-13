var MiniMasonry = function(conf) {
    this._sizes             = [];
    this._columns           = [];
    this._container         = null;
    this._count             = null;
    this._width             = 0;

    this._resizeTimeout = null,

    this.conf = {
        baseWidth: 255,
        gutterX: null,
        gutterY: null,
        gutter: 10,
        container: null,
        minify: true,
        ultimateGutter: 5,
        surroundingGutter: true
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
    if (this.conf.gutterX == null || this.conf.gutterY == null) {
        this.conf.gutterX = this.conf.gutterY = this.conf.gutter;
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

    if (this.getCount() == 1) {
        // Set ultimate gutter when only one column is displayed
        this.conf.gutterX = this.conf.ultimateGutter;
        // As gutters are reduced, to column may fit, forcing to 1
        this._count = 1;
    }

    if (this._width < (this.conf.baseWidth + (2 * this.conf.gutterX))) {
        // Remove gutter when screen is to low
        this.conf.gutterX = 0;
    }
};

MiniMasonry.prototype.getCount = function() {
    if (this.conf.surroundingGutter) {
        return Math.floor((this._width - this.conf.gutterX) / (this.conf.baseWidth + this.conf.gutterX));
    }

    return Math.floor((this._width + this.conf.gutterX) / (this.conf.baseWidth + this.conf.gutterX));
}

MiniMasonry.prototype.computeWidth = function() {
    var width;
    if (this.conf.surroundingGutter) {
        width = ((this._width - this.conf.gutterX) / this._count) - this.conf.gutterX;
    } else {
        width = ((this._width + this.conf.gutterX) / this._count) - this.conf.gutterX;
    }
    width = Number.parseFloat(width.toFixed(2));

    return width;
}

MiniMasonry.prototype.layout =  function() {
    if (!this._container) {
        console.error('Container not found');
        return;
    }
    this.reset();

    //Computing columns count
    if (this._count == null) {
        this._count = this.getCount();
    }
    //Computing columns width
    var width = this.computeWidth();

    for (var i = 0; i < this._count; i++) {
        this._columns[i] = 0;
    }

    //Saving children real heights
    var children = this._container.querySelectorAll(this.conf.container + ' > *');
    for (var k = 0;k< children.length; k++) {
        // Set width before retrieving element height if content is proportional
        children[k].style.width = width + 'px';
        this._sizes[k] = children[k].clientHeight;
    }

    var initialLeft = this.conf.surroundingGutter ? this.conf.gutterX : 0;
    if (this._count > this._sizes.length) {
        //If more columns than children
        var occupiedSpace = (this._sizes.length * (width + this.conf.gutterX)) - this.conf.gutterX;
        initialLeft       = ((this._width - occupiedSpace) / 2);
    }

    //Computing position of children
    for (var index = 0;index < children.length; index++) {
        var nextColumn = this.conf.minify ? this.getShortest() : this.getNextColumn(index);

        var childrenGutter = 0;
        if (this.conf.surroundingGutter || nextColumn != this._columns.length) {
            childrenGutter = this.conf.gutterX;
        }
        var x = initialLeft + ((width + childrenGutter) * (nextColumn));
        var y = this._columns[nextColumn];


        children[index].style.transform = 'translate3d(' + Math.round(x) + 'px,' + Math.round(y) + 'px,0)';

        this._columns[nextColumn]  += this._sizes[index] + (this._count > 1 ? this.conf.gutterY : this.conf.ultimateGutter);//margin-bottom
    }

    this._container.style.height = (this._columns[this.getLongest()] - this.conf.gutterY) + 'px';
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
           // The actualResizeHandler will execute at a rate of 30fps
        }.bind(this), 33);
    }
}

export default MiniMasonry;
