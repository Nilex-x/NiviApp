import gql from "graphql-tag";


export const GET_ALL_MODULE = gql`
  query GetAllModule($KeyAuth: String!, $start: String!, $end: String!) {
    GetAllModule(KeyAuth: $KeyAuth, start: $start, end: $end) {
      title_acti
      end_mod
      begin_mod
      registered
      type_acti
      code_module
      codeinstance
      scolaryear
      title_acti
      title_module
      code_acti
  }
}`

export const GET_USER_INFO = gql`
  query GetUserInfo($KeyAuth: String!) {
    GetUserInfo(KeyAuth: $KeyAuth) {
    firstname
    lastname
    login
    credits
    gpa
    picture
    semester
    studentyear
    promo
    scolaryear
    location
    averageLogTime
  }
}`

export const GET_MODULE_DETAIL = gql`
  query Query($KeyAuth: String!, $scolaryear: String!, $codemodule: String!, $codeinstance: String!) {
  GetModuleDetail(KeyAuth: $KeyAuth, scolaryear: $scolaryear, codemodule: $codemodule, codeinstance: $codeinstance) {
    title
    end_register
    closed
    opened
    credits
    description
    resp {
      title
      picture
    }
    allow_register
    color
    activites {
      codeacti
      module_title
      title
      description
      end_register
      end
      register
      id_projet
      project_title
      deadline
      type_title
      type_code
    }
    studentRegistered {
      login
      name
      picture
      promo
    }
    file
  }
}`

export const GET_BOARD = gql`
  query Query($KeyAuth: String!) {
    GetBoard(KeyAuth: $KeyAuth) {
      notes {
        title
        code_acti
        code_module
        note
        noteur
        codeinstance
        scolaryear
      }
      activites {
        title
        code_acti
        code_module
        scolaryear
        codeinstance
        module
        timeline_start
        timeline_end
        timeline_barre
        salle
        registerLink
      }
      projets {
        title
        code_acti
        code_module
        scolaryear
        codeinstance
        timeline_start
        timeline_end
        timeline_barre
      }
      historys {
        title
        content
        date
        user {
          title
        }
      }
    }
}`

export const GET_PLANNING = gql`
  query Query($KeyAuth: String!) {
    GetPlanning(KeyAuth: $KeyAuth) {
      acti_title
      start
      end
      scolaryear
      codemodule
      codeinstance
      codeacti
      codeevent
      semester
      titlemodule
      total_students_registered
      title
      type_title
      is_rdv
      type_code
      nb_hours
      allowed_planning_start
      allowed_planning_end
      nb_group
      nb_max_students_projet
      salle
      nb_seat
      module_available
      module_registered
      past
      allow_register
      event_registered
      project
    }
  }
`

export const GET_ACTI_DETAIL = gql`
  query GetActiDetail($KeyAuth: String!, $codemodule: String!, $codeinstance: String!, $scolaryear: String!, $codeActi: String) {
    GetActiDetail(KeyAuth: $KeyAuth, codemodule: $codemodule, codeinstance: $codeinstance, scolaryear: $scolaryear, codeActi: $codeActi) {
      module_title
      description
      type_title
      title
      type_code
      begin
      start
      end_register
      deadline
      end
      nb_hours
      nb_group
      num
      register
      is_projet
      is_note
      nb_notes
      rdv_status
      archive
      nb_planified
      events {
        code
        seats
        title
        description
        nb_inscrits
        begin
        end
        location
        registed
        resp {
          title
          picture
        }
        user_status
      }
    }
  }
`

export const LOGIN_USER = gql`
query LoginUser($KeyAuth: String!) {
  Login(KeyAuth: $KeyAuth) {
    login
    lastname
    firstname
  }
}`

export const GET_DAY_EVENT = gql`
query GetDayEvent($KeyAuth: String!, $start: String!, $country: String!, $city: String!) {
  GetDayEvent(KeyAuth: $KeyAuth, start: $start, country: $country, city: $city) {
    scolaryear
    codemodule
    codeevent
    codeinstance
    codeacti
    semester
    titlemodule
    acti_title
    start
    end
    total_students_registered
    type_title
    type_code
    title
    is_rdv
    allowed_planning_start
    nb_hours
    allowed_planning_end
    salle
    nb_max_students_projet
    nb_group
    nb_seat
    module_available
    module_registered
    past
    allow_register
    event_registered
    project
  }
}`

export const GET_PROJECT_DETAILS = gql`
query GetProjectDetails($KeyAuth: String!, $codeActi: String, $codeinstance: String!, $codemodule: String!, $scolaryear: String!) {
  GetProjectDetails(KeyAuth: $KeyAuth, codeActi: $codeActi, codeinstance: $codeinstance, codemodule: $codemodule, scolaryear: $scolaryear) {
    begin
    start
    title
    description
    end
    register
    scolaryear
    codemodule
    codeinstance
    codeacti
    registered {
      login
      name
      promo
      picture
    }
  }
}`

export const REGISTER_ACTI = gql`
mutation RegisterActi($keyAuth: String!, $scolaryear: String!, $codemodule: String!, $codeinstance: String!, $codeActi: String!, $codeEvent: String!) {
  RegisterActi(KeyAuth: $keyAuth, scolaryear: $scolaryear, codemodule: $codemodule, codeinstance: $codeinstance, codeActi: $codeActi, codeEvent: $codeEvent)
}
`

export const UNREGISTER_ACTI = gql`
mutation UnregisterActi($keyAuth: String!, $scolaryear: String!, $codemodule: String!, $codeinstance: String!, $codeActi: String!, $codeEvent: String!) {
  UnregisterActi(KeyAuth: $keyAuth, scolaryear: $scolaryear, codemodule: $codemodule, codeinstance: $codeinstance, codeActi: $codeActi, codeEvent: $codeEvent)
}
`

export const GET_MODULES = gql`
query GetModules($keyAuth: String!) {
  GetModules(KeyAuth: $keyAuth) {
    scolaryear
    codeinstance
    semester
    end
    begin
    code
    title
    credits
    open
    status
  }
}
`

export const GET_MARKS_DATE = gql`
query GetMarks($keyAuth: String!) {
  GetMarks(KeyAuth: $keyAuth) {
    semester
    notes {
      scolaryear
      codemodule
      titlemodule
      codeinstance
      codeacti
      title
      date
      correcteur
      final_note
      comment
    }
    modules {
      scolaryear
      codemodule
      codeinstance
      title
      date_ins
      grade
      credits
    }
  }
}`