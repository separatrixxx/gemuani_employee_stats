import Head from 'next/head';
import { ErrorPage } from '../../page_components/ErrorPage/ErrorPage';
import { useRouter } from 'next/router';
import { setLocale } from '../../helpers/locale.helper';


function PageNotFound(): JSX.Element {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{setLocale(router.locale).gemuani_employee_stats + ' - 404'}</title>
			</Head>
			<ErrorPage error={404} />
		</>
	);
}

export default PageNotFound;