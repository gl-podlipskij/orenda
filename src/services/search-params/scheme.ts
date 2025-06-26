import * as yup from "yup";


const createSearchParamsScheme = ()=> {
   return yup.object().shape({
        page: yup.number().integer().min(1).notRequired(),
        query: yup.string().notRequired(),
        city : yup.string().notRequired(),
        region : yup.string().notRequired(),
    })
}

export default createSearchParamsScheme;