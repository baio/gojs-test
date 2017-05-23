const DESCR = "Основы администрирования Orcale с отработкой знаний на практике.";

export default {

    groups:
    [
    {
      name: "Ядерная программа",
      points: 1200,
      blocks: [
        //1st
        {
          type: "unit",
          data: { code: "Б1.Б.1", description: "Письмо и мышление", points: 200, state: "passed"},
          key: "a11",
          links: [{ key: "a21" }, { key: "a22" }, { key: "a23" }]
        },
        {
          type: "unit",
          data: { code: "Б1.Б.2", description: "Теории текстуальности", points: 200, state: "passed"},
          key: "a12",
          links: [{ key: "a22" }, { key: "a23" }]
        },
        {
          type: "unit",
          data: { code: "Б1.Б.3", description: "Текст: анализ и интерпретация", points: 200, state: "passed"},
          key: "a13",
          links: [{ key: "a22" }, { key: "a23" }, { key: "a24" }]
        },
        {
          type: "unit",
          data: { code: "Б1.Б.4", description: "Риторика и коммуникации", points: 200, state: "passed"},
          key: "a14",
          links: [{ key: "a22" }, { key: "a23" }]
        },
        {
          type: "unit",
          data: { code: "Б1.Б.5", description: "Физическая культура", points: 100, state: "passed"},
          key: "a15",
          links: []
        },
        {
          type: "unit",
          data: { code: "Б1.Б.13", description: "БЖД", points: 100, state: "passed"},
          key: "a16",
          links: []
        },
        //2nd
        {
          type: "unit",
          data: {code: "Б1.Б.9", description: "Основы математического анализа", points: 150},
          key: "a21",
          links: [{ key: "a31" }]
        },
        {
          type: "course",
          data: {code: "Б1.Б.7", description: "Философия, Великие книги", points: 200, state: "passed"},
          key: "a22",
          links: [{ key: "a32" }, { key: "a33" }, {key: "h11"}]
        },
        {
          type: "course",
          data: {code: "Б1.Б.6", description: "История", points: 150},
          key: "a23",
          links: [{ key: "a33" }, {key: "j11"}]
        },
        {
          type: "course",
          data: {code: "Б1.Б.14", description: "Иностранный язык, Академическое письмо", points: 250},
          key: "a24",
          links: []
        },
        //3rd
        {
          type: "none",
          data: {code: "", description: "Численные методы", points: 300},
          key: "a31",
          links: [ {key: "e11"}, {key: "f11"} ]
        },
        {
          type: "course",
          data: {code: "Б1.Б.10", description: "Литература, Великие книги", points: 200},
          key: "a32",
          links: [{ key: "a41" }, { key: "a42" }, { key: "b11" }]
        },
        {
          type: "unit",
          data: {code: "Б1.Б.8", description: "Актуальные мировые проблемы", points: 250},
          key: "a33",
          links: [{ key: "a42" }, { key: "b12" } ]
        },
        //4th
        {
          type: "unit",
          data: {code: "Б1.Б.11", description: "Искусствознание", points: 200},
          key: "a41",
          links: [{key: "j11"}]
        },
        {
          type: "unit",
          data: {code: "Б1.Б.12", description: "Проблемы современного естесствознания", points: 250},
          key: "a42",
          links: [{key: "g11"}]
        }
      ]
    },
    {
      name: "Экономика",
      points: 1200,
      blocks: [
        {
          type: "unit",
          data: {code: "У1.Б.12", description: DESCR, points: 100},
          key: "e11",
          links: [{key: "c11"}]
        },
        {
          type: "unit",
          data: {code: "У1.Б.12", description: DESCR, points: 100},
          key: "e22",
          links: []
        }
      ]
    },
    {
      name: "IT & Big Data",
      points: 1200,
      blocks: [
        {
          type: "unit",
          data: {code: "К1.Б.12", description: DESCR, points: 100},
          key: "f11",
          links: [{key: "c12"}]
        },
        {
          type: "unit",
          data: {code: "К1.Б.12", description: DESCR, points: 100},
          key: "f12",
          links: []
        }
      ]
    },
    {
      name: "Науки о жизни",
      points: 1200,
      blocks: [
        {
          type: "unit",
          data: {code: "Ц1.Б.12", description: DESCR, points: 100},
          key: "g11",
          links: [{key: "c12"}]
        },
        {
          type: "unit",
          data: {code: "Ц1.Б.12", description: DESCR, points: 100},
          key: "g12",
          links: []
        }
      ]
    },
    {
      name: "Культурные исследования",
      points: 1200,
      blocks: [
        //1st
        {
          type: "unit",
          data: { code: "Б1.В.ОД.1", description: "Теории культуры", points: 200},
          key: "b11",
          links: [{ key: "b21" }]
        },
        {
          type: "unit",
          data: { code: "Б1.В.ОД.2", description: "Основы гуманитарных наук и критическая теория", points: 150},
          key: "b12",
          links: [{ key: "b22" }, { key: "b31" }]
        },
        {
          type: "none",
          data: { code: "Б1.В.ОД.3", description: "Методы исследования культуры", points: 150},
          key: "b13",
          links: []
        },
        {
          type: "none",
          data: {code: "Б1.В.ДВ.12.1", description: "Выбор", points: 100},
          key: "b14",
          links: []
        },
        //2nd
        {
          type: "unit",
          data: {code: "Б1.В.ОД.4", description: "Культурная антропология", points: 200},
          key: "b21",
          links: []
        },
        {
          type: "unit",
          data: {code: "Б1.В.ОД.5", description: "Русская культура: классика и авангард", points: 200},
          key: "b22",
          links: [{ key: "b32" }, { key: "b33" }]
        },
        //3rd
        {
          type: "unit",
          data: {code: "Б1.В.ОД.6", description: "Современная массовая культура", points: 100},
          key: "b31",
          links: [{ key: "c13" }]
        },
        {
          type: "none",
          data: {code: "Б1.В.ДВ.13.1", description: "Выбор", points: 100},
          key: "b32",
          links: [{ key: "c13" }]
        },
        {
          type: "none",
          data: {code: "Б1.В.ДВ.14.1", description: "Выбор", points: 100},
          key: "b33",
          links: [{ key: "c13" }]
        }
      ]
    },
    {
      name: "История",
      points: 700,
      blocks: [
        {
          type: "unit",
          data: {code: "И1.Б.12", description: DESCR, points: 100},
          key: "h11",
          links: []
        },
        {
          type: "unit",
          data: {code: "И1.Б.12", description: DESCR, points: 100},
          key: "h12",
          links: [{key: "i11"}]
        }
      ]
    },
    {
      name: "Социология и антропология",
      points: 500,
      blocks: [
        {
          type: "unit",
          data: {code: "С1.Б.12", description: DESCR, points: 100},
          key: "i11",
          links: [{key: "c13"}]
        },
        {
          type: "unit",
          data: {code: "С1.Б.12", description: DESCR, points: 100},
          key: "i12",
          links: []
        }
      ]
    },
    {
      name: "Медиа",
      points: 1200,
      blocks: [
        {
          type: "unit",
          data: {code: "М1.Б.12", description: DESCR, points: 100},
          key: "j11",
          links: [{key: "c13"}]
        },
        {
          type: "unit",
          data: {code: "М1.Б.12", description: DESCR, points: 100},
          key: "j12",
          links: []
        }
      ]
    },
    {
      name: "Государственная итоговая аттестация",
      points: 600,
      blocks: [
        //1st
        {
          type: "unit",
          data: { code: "", description: "Сдача ГЭК: общественные науки", points: 300},
          key: "c11",
          links: [{ key: "c21" }]
        },
        {
          type: "unit",
          data: { code: "", description: "Сдача ГЭК: естесственные науки", points: 300},
          key: "c12",
          links: [{ key: "c22" }]
        },
        {
          type: "unit",
          data: { code: "", description: "Сдача ГЭК: гуманитарные науки", points: 300},
          key: "c13",
          links: [{ key: "c23" }]
        },
        //2nd
        {
          type: "unit",
          data: { code: "", description: "Защита дипломной работы: общественные науки", points: 300},
          key: "c21",
          links: []
        },
        {
          type: "unit",
          data: { code: "", description: "Защита дипломной работы: естесственные науки", points: 300},
          key: "c22",
          links: []
        },
        {
          type: "unit",
          data: { code: "", description: "Защита дипломной работы: гуманитарные науки", points: 300},
          key: "c23",
          links: []
        }
      ]
    },
    {
      name: "Дисциплины по выбору",
      points: 3000,
      blocks: [
        {
          type: "none",
          data: { code: "Б1.В.ДВ.1.1", description: "Выбор", points: 100},
          key: "a01",
          links: []
        },
        {
          type: "none",
          data: { code: "Б1.В.ДВ.2.1", description: "Выбор", points: 100},
          key: "a02",
          links: []
        },
        {
          type: "none",
          data: { code: "Б1.В.ДВ.3.1", description: "Выбор", points: 100},
          key: "a03",
          links: []
        },
        {
          type: "none",
          data: { code: "Б1.В.ДВ.4.1", description: "Выбор", points: 100},
          key: "a04",
          links: []
        },
        {
          type: "none",
          data: { code: "Б1.В.ДВ.5.1", description: "Выбор", points: 100},
          key: "a05",
          links: []
        }
      ]
    }
  ]
};