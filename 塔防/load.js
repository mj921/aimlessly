class Load {
    constructor () {
        this.imgs = {};
    }
    add (name, url) {
        this.imgs[name] = url;
    }
    load () {
        let promiseList = [];
        Object.keys(this.imgs).forEach(name => {
            var img = new Image();
            img.src = this.imgs[name];
            this.imgs[name] = img;
            promiseList.push(new Promise((resolve, reject) => {
                img.onload = () => {
                    resolve();
                }
                img.onerror = () => {
                    reject();
                }
            }))
        })
        return Promise.all(promiseList);
    }
    getImg (name) {
        return this.imgs[name];
    }
}