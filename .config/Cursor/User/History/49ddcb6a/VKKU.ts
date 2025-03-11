import { Module } from "@/constants/modules";

export const routes = [
  {
    title: "Archivo",
    routes: [
      {
        title: "Bandas",
        url: "/analysis/archive/bands",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 684
      },
      {
        title: "Redip",
        url: "/analysis/archive/redip",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },
      {
        title: "Estado",
        url: "/analysis/archive/estate",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },
      {
        title: "Municipio",
        url: "/analysis/archive/municipality",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },
      {
        title: "Parroquia",
        url: "/analysis/archive/parish",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },
      {
        title: "Sector",
        url: "/analysis/archive/sector",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },
      {
        title: "Cuadrante",
        url: "/analysis/archive/quadrant",
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 853,
        height: 484
      },

      {
        title: "Salir del Sistema",
        url: "/archivo/close-sistem",
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    ]
  },
  {
    title: "Gestion",
    routes: [
      {
        title: "RePeIn",
        url: "/analysis/management/repein-personal/personals",
        center: true,
        maximized: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Vinculacion",
        url: "/analysis/management/bounding/band",
        label: "/analysis/management/bounding",
        center: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Actualizacion",
        url: "/analysis/management/update",
        center: true,
        maximized: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "R.O.D",
        url: "/analysis/management/rod",
        center: true,
        maximized: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Procedimiento",
        url: "/analysis/management/procedure",
        center: true,
        maximized: true,
        resizable: true,
        decorations: false,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    ]
  },
  {
    title: "Reportes",
    routes: [
      {
        title: "Personas",
        url: "analysis/reportes/person",
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Bandas",
        url: "analysis/reportes/bands",
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Estadisticas",
        url: "analysis/reportes/stadistics",
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      {
        title: "Graficas",
        url: "analysis/reportes/graphics",
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    ]
  },
  {
    title: "Configuracion",
    routes: [
      {
        title: "General",
        url: `/config/general?m=${Module.ANALYSIS_MODULE}`,
        label: "/config/general",
        center: true,
        decorations: false,
        width: 550,
        height: 630,
        x: 0,
        y: 0
      },
      {
        title: "Organismo",
        url: "/config/enterprise",
        width: 600,
        height: 800,
        center: true,
        x: 0,
        y: 0,
        decorations: false
      },
      {
        title: "Conexión a Base de Datos",
        url: `/config/database?m=${Module.ANALYSIS_MODULE}`,
        label: "/config/database",
        width: 600,
        center: true,
        height: 700,
        decorations: false,
        x: 0,
        y: 0
      },
      {
        title: "Usuarios",
        url: "/config/users",
        width: 1000,
        height: 800,
        x: 0,
        y: 0
      },
      {
        title: "Lista de Tablas",
        url: "/config/tables",
        width: 530,
        center: true,
        decorations: false,
        x: 0,
        y: 0,
        height: 650
      }
    ]
  }
];
