import { GetServerSideProps } from 'next';
import { DashboardAuthenticated } from '../../../utils/helpers/dashboard-authenticated';


// export const columnsAboutUs: ItemType[] = [
//     {
//         columnType: {
//             title: 'Content',
//             dataIndex: 'content',
//             width: 'auto',
//         },
//         type: 'html-editor',
//         trans: true
//     },
// ];

const ManageAboutUss: React.FC = () => {
    // const { lang } = useTranslation()
    // const dispatch = useDispatch()

    // const aboutUs = useSelector(selectAboutUs)
    // const status = useSelector(selectAboutUsStatus)

    // useEffect(() => {
    //     dispatch(FetchAboutUsAsync())
    // }, [dispatch])

    return (
        // <CRUDBuilder
        //     lang={lang === 'en' ? 'en' : 'ar'}
        //     items={[aboutUs]}
        //     loading={status === 'loading'}
        //     UpdateAsync={(el) => UpdateAboutUsAsync({ aboutUs: el.item, id: el.id })}
        //     itemsHeader={columnsAboutUs}
        // />
        <>
            Coming Soon
        </>
    )
}
export default ManageAboutUss;

export const getServerSideProps: GetServerSideProps = DashboardAuthenticated;