/* global angular, StatusBar, cordova */
angular.module('hochzeitstimer.services', [])
.factory('$MyStorage', function(){	
	var setData = function(data, key){
		if(data === undefined || key === undefined){return false;}
		var value = null;
		switch (typeof(data)){
			case "object" : if(data !== null){ value=_stringifyData(data); } break;
			case "String":
			case "number" :  value = data; break;
			case "boolean" : value = data ? "{bool}1" : "{bool}0" ;
			case "function" :
			default :  value = null;
		}
		localStorage.setItem(key, value);
		return true;
	},
		getData = function(key){
			var value = localStorage.getItem(key);
            if(value === null) { return null; }
			if(value.match(/^({object})/)){
				var retval = _parseData(value);
                return retval;
			} else if(value.match(/^({bool})/)){
                var retbool = (value.replace(/^({bool})/,"") === "1"); 
				return retbool;
			} else {
				return value;
			}
		},
		_stringifyData = function(object){
			var stringObject = JSON.stringify(object);
			return "{object}"+stringObject;
		},
		_parseData = function(data){
			var useablePart = data.replace(/^({object})/, "");
			var retData = {};
			try{
				retData = JSON.parse(useablePart);
			} catch(e){
				//console.log(e);
			}
			return retData;
		};
		return {
			getData : getData,
			setData : setData
		};
})
.factory('myUUID', function(){
  var s4 = function () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return function(){return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  };
})
.factory('comingHomeServ', function($http,$MyStorage) {
  	/**
	   * TODO!
	   * $http Server und anbindung gestalten um die App auch remote fähig zu machen
	   * 
	*/
	var _comingHomeObj = {},
		_comingHomeObjProto = {
			comingHome : false,
			home : false,
			work: false
		},
		_saveObj = function(){
			$MyStorage.setItem(_comingHomeObj, 'comingHomeObj');
		},
		_getObj = function(){
			_comingHomeObj = $MyStorage.getItem('comingHomeObj');
			if(_comingHomeObj === null){
				$MyStorage.setItem(_comingHomeObjProto, 'comingHomeObj');
				_comingHomeObj = _comingHomeObjProto;
			}
			
		},
		getComingHome = function(attr){
			_getObj();
			return _comingHomeObj[attr];
		},
		changeComingHome = function(attr){
			_comingHomeObj[attr] = !_comingHomeObj[attr];
			_saveObj();
		};
		return {
			getComingHome : getComingHome,
			changeComingHome : changeComingHome
		};
		
})
.factory('todoService', function($MyStorage, myUUID){
	var remove = function(todoItem){
			$MyStorage.setData(null, todoItem.id);
            _rmFromList(todoItem.id);
		},
		add = function(newTodo){
			newTodo.id = myUUID();
			$MyStorage.setData(newTodo, newTodo.id);
			_addToList(newTodo.id);
		},
		toggleDone = function(todoID){
			var todoItem = $MyStorage.getData(todoID);
			todoItem.done = !todoItem.done;
			$MyStorage.setData(todoItem, todoItem.id);
		},
		getAll = function(){
			allTodo = [];
			var list = $MyStorage.getData('list');
            console.log("getList:")
            console.log(list);
			if(list === null) { list = []; }
			angular.forEach(list, function(value,key){
                if(value.id !== undefined){
                    value = value.id;
                }
				var todo = $MyStorage.getData(value);
				if(todo !== null && todo !== {}){
					allTodo.push(todo);
				}
			});
            console.log(allTodo);
			return allTodo;
		},
		_addToList = function(todoID){
			allTodo.push(todoID);
			$MyStorage.setData(allTodo, 'list');
		},
        _rmFromList = function(todoID){
            allTodo.splice(allTodo.indexOf(todoID),1);
			$MyStorage.setData(allTodo, 'list');
        },
		allTodo = [];
        
		return{
			remove : remove,
			add : add,
			toggleDone : toggleDone,
			getAll : getAll
		}
});