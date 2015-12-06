function loginFunc() {
    var uname = document.getElementById('uname_input').value;
    if (uname === document.getElementById('pword_input').value) {
        if (uname === 'admin') {
            document.getElementById('page1').style.display = 'none';
            document.getElementById('page2').style.display = 'block';
            document.getElementById('uname_input').value = '';
            document.getElementById('pword_input').value = '';
            return;
        }
    }
    alert("bad login");
}

function logoutFunc() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page1').style.display = 'block';
    alert("you logged out successfully")
}

function calculatorFunc() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'block';
}

function BuildDiv1() {
    var curDiv = document.getElementById('page1');

    var inputsDiv = document.createElement('div');
    inputsDiv.id = 'inputsDiv;'; // todo: maybe redundant
    inputsDiv.innerHTML = 'Username: <input type="text" id="uname_input"><br>Password: <input type="password" id="pword_input">';
    curDiv.appendChild(inputsDiv);

    var buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = '<input id="loginButton" type="submit" value="Login" class="actionButton" onclick="loginFunc();" />';
    curDiv.appendChild(buttonDiv);
}

function BuildDiv2() {
    var curDiv = document.getElementById('page2');

    var textDiv = document.createElement('div');
    textDiv.id = 'textDiv';
    textDiv.innerHTML = 'My name is Oded Abrams, I\'m a 3rd year student in Hebrew University.<br>' +
        'I like playing video games, movies and tv shows. I also like getting 100s in the course <br>' +
        'Internet Technologies.<br>' +
        'This is my Ex2 page. There are many like it, but this one is mine.';
    curDiv.appendChild(textDiv);

    var imagesDiv = document.createElement('div');
    imagesDiv.id = 'imagesDiv';
    curDiv.appendChild(imagesDiv);

    var buttonsDiv = document.createElement('div');
    buttonsDiv.id = 'buttonsDiv';
    buttonsDiv.innerHTML = '<input id="logoutButton" type="submit" value="Logout" class="actionButton" onclick="logoutFunc();" />';
    buttonsDiv.innerHTML += '<input id="calcButton2" type="submit" value="Calculator" class="actionButton" onclick="calculatorFunc();" />';
    curDiv.appendChild(buttonsDiv)
}

var calcCount = 0;
var calcButtons = ['0','1','2','3','4','5','6','7','8','9','+','-','*','='];
var calculators = [];

function executeCalcFunc(var1, func, var2){
    if (func === '+') {
        return parseInt(var1) + parseInt(var2);
    }
    if (func === '-') {
        return parseInt(var1) - parseInt(var2);
    }
    if (func === '*') {
        return parseInt(var1) * parseInt(var2);
    }
}

function handleCalc(calcButton) {
    var idString = calcButton.id.toString();
    var calcID = parseInt(idString.substring(0,idString.indexOf('_')));
    var calcFunc = idString.substring(idString.indexOf('_') + 1,idString.length);
    document.getElementById(calcID.toString() + '_val').value = calculators[calcID].doCalc(calcFunc);
}

function Calc() {
    var calcID = calcCount;
    calcCount += 1;
    var curValue = 0;
    var newValue = 0;
    var curFunc = undefined;
    this.doCalc = function (calcFunc) {
        if (calcFunc === '=') {
            curValue = executeCalcFunc(curValue, curFunc, newValue);
            return curValue;
        }
        else if (isNaN(calcFunc)) {
            if (curFunc === undefined) {
                curValue = newValue;
            }
            newValue = 0;
            curFunc = calcFunc;
            return newValue;
        }
        else {
            newValue = (newValue * 10) + parseInt(calcFunc);
            return newValue;
        }
    };
    this.getID = function () {
        return calcID;
    };


    var curDiv = document.getElementById('page3');
    var calcDiv = document.createElement('div');

    calcDiv.id = 'calcDiv' + calcID.toString();
    calcDiv.className = 'calculatorDiv';
    calcDiv.innerHTML += '<textarea id="' + calcID.toString() +'_val" disabled></textarea>';

    var buttonsDiv = document.createElement('div');
    for (var i = 0 ; i < calcButtons.length ; i++) {
        buttonsDiv.innerHTML += '<input id="' + calcID.toString() + '_' + calcButtons[i] + '" type="submit" value="'+calcButtons[i]+'" onclick="handleCalc(this);" />';
    }

    calcDiv.appendChild(buttonsDiv);
    curDiv.appendChild(calcDiv);


    return this;

}

function BuildDiv3() {
    var curDiv = document.getElementById('page3');
    curDiv.innerHTML += '<input id="calcButton3" type="submit" value="Calculator" class="actionButton" onclick="calculators.push(new Calc());" />';
    calculators.push(new Calc());

}

function onLoad(){

    var curDiv;
    for (var i = 1 ; i <= 3 ; i++) {
        curDiv = document.createElement('div');
        curDiv.id = 'page' + i.toString();
        curDiv.className = 'contentDiv';
        if (i === 1) {
            curDiv.style.display = 'block'
        }
        else {
            curDiv.style.display = 'none'
        }
        document.body.appendChild(curDiv)
    }
    BuildDiv1();
    BuildDiv2();
    BuildDiv3();
}

onLoad();