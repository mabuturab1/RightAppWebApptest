import { EventSchema } from '..';
import { AppPlaystoreLink } from '../../config/constants';
import axiosService from '../axiosService';
export async function fetchEventDetails(id: string, type: string, appId: string = 'Right') {
  try {
    const response = await axiosService.get<EventSchema>(`/event-public-details/${id}${type ? `?type=${type}` : ''}`, {
      headers: {
        appid: appId,
      },
    });
    const eventDetailResp = response?.data;
    const eventDetail: EventSchema = {
      backgroundImage:
        'https://media.istockphoto.com/photos/table-setting-for-an-event-party-or-wedding-reception-picture-id479977238?b=1&k=20&m=479977238&s=170667a&w=0&h=V5aoTjfquc3a-qNBz9hyKJ9bX48XuJW0DVzCaO77U1c=',
      dynamicLink: 'https://1umatch.co/testevent',
      webLink: AppPlaystoreLink,
      ...eventDetailResp,
    };
    return { data: eventDetail, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
