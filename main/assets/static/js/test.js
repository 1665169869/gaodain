function a(callback) {
    callback("123");
};

function b() {
    a((r) => {
        console.log(r)
    })
    console.log("czx");
}

b()

switch (key) {
    case value:
        
        break;

    default:
        break;
}