import { GetServerSideProps } from 'next';
import { fetchEventDetails } from '../../../api/fetch';
import EventDetail from '../../../components/eventDetail';

export default function EventDetailAbto(props: any) {
  return <EventDetail {...props} appId='RIGHT' />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const { id } = context.params || { id: null };
  const { type } = context.query;
  console.log('type is', type)
  console.log('starting fetch', new Date().getTime());
  const { data, error } = await fetchEventDetails(id as string, type as string, 'Right');
  console.log('Ending fetch', new Date().getTime());
  // Pass data to the page via props
  return { props: { data, error } };
};
