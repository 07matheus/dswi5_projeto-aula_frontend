import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const SideBarData = [
    {
       page:'Página Principal',
       icon: <AiIcons.AiFillDashboard/>,
       path: '/dashboard'     
    },
    {
        page:'Usuário',
        icon: <FaIcons.FaUser/>,
        path: '/usuario/listar'
    },
    {
       page:'Direitos de Acesso',
       icon: <FaIcons.FaTablet/>,
       path: '/role/listar'
    }
]


export default SideBarData;