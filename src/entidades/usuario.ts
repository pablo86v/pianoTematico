export class Usuario

{

    //*************************************************************************************
	//***************************** ATRIBUTOS - CONSTRUCTOR *******************************
	//*************************************************************************************    
    public id			: number;
    public nombre      	: string;
    public clave		: string;
    public perfil		: string;
    public sexo    		: string;


    
    //El parámetro id al llevar el signo '?' es opcional 
    // constructor(nombreUsuario: string, password: number, perfil: string,sexo:string, id?: number)
    // {
    //     this.nombre         = nombreUsuario ;
    //     this.clave          = password      ;
    //     this.perfil         = perfil         ;
    //     this.sexo           = sexo   ;

    //     //Si el constructor recibe un id se lo asigno al objeto
    //     if(id)
    //     {
    //         this.id = id;
    //     }
    // }

    constructor(){}



    //*************************************************************************************
	//********************************* PROPIEDADES ***************************************
	//*************************************************************************************

    //GETTERS

    // public getId		    () { return this.id            ; }
    // public getNombreUsuario () { return this.nombre ; }
    // public getPassword      () { return this.clave      ; }
    // public getPerfil        () { return this.perfil         ; }
    // public getSexo          () { return this.sexo   ; }
    
	
  
    // //SETTERS

    // public setId		    (id            : number)  { this.id            = id             ; }
    // public setNombreUsuario (nombreUsuario : string)  { this.nombre = nombreUsuario  ; }
    // public setPassword      (password      : number)  { this.clave      = password       ; }
    // public setPerfil       (perfil         : string)  { this.perfil         = perfil          ; }
    // public setSexo   (sexo   : string)  { this.sexo   = sexo    ; }
   
   
}