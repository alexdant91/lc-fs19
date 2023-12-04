class Rectangle {
    constructor(h, b) {
        this.h = h;
        this.b = b;
    }
}

class Circle {
    constructor(r) {
        this.r = r;
    }
}


class RectangleCalculator extends Rectangle {
    #area;
    #perimeter;
    #unitCoeff;

    constructor({h, b}) {
        super(h, b);
        
        this.#calculateCoeff();
    }

    static unit = "cm";

    #calculateCoeff = () => {
        const unitMap = {
            m: 0.01,
            dm: 0.1,
            cm: 1,
            mm: 10,
        }

        if (unitMap[RectangleCalculator.unit]) {
            this.#unitCoeff = unitMap[RectangleCalculator.unit];
        } else {
            throw new Error("Unit not valid");
        }
    }

    setUnit = (unit) => {
        RectangleCalculator.unit = unit;
        this.#calculateCoeff();
        return this;
    }

    area = () => {
        this.#area = `${this.h * this.b * this.#unitCoeff}${RectangleCalculator.unit}`;
        return this;
    }

    perimeter = () => {
        this.#perimeter = `${((this.b + this.h) * 2) * this.#unitCoeff}${RectangleCalculator.unit}`;
        return this;
    }

    print = (what = "area") => {
        if (what == "area") {
            console.log(this.#area);
        } else if (what == "perimeter") {
            console.log(this.#perimeter);
        }
        return this;
    }
}

class CircleCalculator extends Circle {
    #area;
    #perimeter;
    #unitCoeff;

    constructor({r}) {
        super(r);
        // this.unit = CircleCalculator.unit;

        this.#calculateCoeff();
    }

    static unit = "cm";

    #calculateCoeff = () => {
        const unitMap = {
            m: 0.01,
            dm: 0.1,
            cm: 1,
            mm: 10,
        }

        if (unitMap[CircleCalculator.unit]) {
            this.#unitCoeff = unitMap[CircleCalculator.unit];
        } else {
            throw new Error("Unit not valid");
        }
    }

    setUnit = (unit) => {
        CircleCalculator.unit = unit;
        this.#calculateCoeff();
        return this;
    }

    area = () => {
        this.#area = `${(this.r * this.r * Math.PI * this.#unitCoeff).toFixed(2)}${CircleCalculator.unit}`;
        return this;
    }

    perimeter = () => {
        this.#perimeter = `${(this.r * 2 * Math.PI * this.#unitCoeff).toFixed(2)}${CircleCalculator.unit}`;
        return this;
    }

    print = (what = "area") => {
        if (what == "area") {
            console.log(this.#area);
        } else if (what == "perimeter") {
            console.log(this.#perimeter);
        }
        return this;
    }
}

class Calculator {
    constructor(figure = "rectangle") {
        this.figure = figure;
    }

    exec = (options) => {
        if (this.figure == "rectangle") {
            RectangleCalculator.unit = options.unit;
            return new RectangleCalculator({h: options.h, b:options.b});
        } else if(this.figure == "circle") {
            CircleCalculator.unit = options.unit;
            return new CircleCalculator({r: options.r});
        }
    }
}

const rectangleCalculator = new Calculator("rectangle").exec({h: 5, b: 10, unit: "m"});

rectangleCalculator.area().print("area");

const circleCalculator =  new Calculator("circle").exec({r: 5, unit: "m"});

circleCalculator.area().print("area");