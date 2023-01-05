const keys = [
    [
        ["1", "!"],
        ["2", "+"],
        ["3", "@"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],  
    ],
    
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"], 
    ],

    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["<", "{"],
        ["ç", "}"],  
    ],


    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
        
    ],

    [["SPACE","SPACE"]],
];

let mayuscula = false;
let shift = false;
let current = null;

let renderKeyBoard = () =>{
    const keyBoard = document.querySelector("#keyboard");
    let empty = `<div class="empty-space"></div>`;

    const capas = keys.map((capa) =>{
        return capa.map( key => {
            if(key[0] === "SHIFT"){
                return `<button class="key key-shift ${shift ? "activated" : ""}">${key[0]}</button>`;
            }
            if(key[0] === "MAYUS"){
                return `<button class="key key-mayus  ${mayuscula ? "activated" : ""}">${key[0]}</button>`;
            }
            if(key[0] === "SPACE"){
                return `<button class="key key-space"></button>`;
            }


            return `<button class="key key-nor">
                      ${shift? key[1] : mayuscula && key[0].toLowerCase().charCodeAt(0) >= 97 &&
                                                     key[0].toLowerCase().charCodeAt(0) <= 122
                        ? key[1] : key[0] }
                   </button>`;
        });
    });

    capas[0].push(empty);
    capas[1].unshift(empty);

    const htmlCapas = capas.map((capa) =>{
        return capa.join("");
    });

    keyBoard.innerHTML = "";

    htmlCapas.forEach(layer => {
        keyBoard.innerHTML += `<div class="layer">${layer}</div>`;
    });

    document.querySelectorAll(".key").forEach(key => {
        key.addEventListener("click", e => {
            if(current){
                if(key.textContent === "SHIFT"){
                    shift =! shift;
                    renderKeyBoard();
                }else if(key.textContent === "MAYUS"){
                    mayuscula =! mayuscula;
                    renderKeyBoard();
                }else if(key.textContent === " "){
                    current.value += " ";
                }else{
                    current.value += key.textContent.trim();
                    if(shift){
                        shift = false;
                        renderKeyBoard();
                        current.focus();
                    }
                }
            }
        })
    })

};

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focusin", (e) => {
        current = e.target;
    });
})

renderKeyBoard();