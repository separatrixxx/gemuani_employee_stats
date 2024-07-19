import { MainPage } from "../../page_components/MainPage/MainPage";
import Head from 'next/head';
import { useRouter } from "next/router";
import { setLocale } from "../../helpers/locale.helper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEmployees } from "../../helpers/employees.hekper";


function Main(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getEmployees(dispatch);
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).gemuani_employee_stats}</title>
        <meta name='description' content={setLocale(router.locale).gemuani_employee_stats} />
        <meta property='og:title' content={setLocale(router.locale).gemuani_employee_stats} />
        <meta name='og:description' content={setLocale(router.locale).gemuani_employee_stats} />
        <meta charSet="utf-8" />
      </Head>
      <MainPage />
    </>
  );
}

export default Main;
