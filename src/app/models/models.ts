export interface Negocios {
    id: number;
    nombre: string;
    descripcion: string;
    direccion: string;
    telefono1: number;
    telefono2: number;
    correo: string;
    whatsapp: number;
    dueño: string;
    instagram: string;
    facebook: string;
    web: string;
    logo: string;
    icon: string;
    eslogan: string;
    lat: number;
    lng: number;
}


export interface Eventos {

id: number;
imagen: string;
nombre: string;
descripcion: string;
lugar: string;
fecha: string;
hora: string;
organizador: string;
organizadorId: number;
lat: number;
long: number;

}