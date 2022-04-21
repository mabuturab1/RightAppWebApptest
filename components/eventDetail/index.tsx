import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { EventSchema } from '../../api';
import { fetchEventDetails } from '../../api/fetch';
import styled from 'styled-components';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import ShareIcon from '@mui/icons-material/Share';
import GroupsIcon from '@mui/icons-material/Groups';
import { isMobile } from 'react-device-detect';
import { AppPlaystoreLink } from '../../config';
import moment from 'moment';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

export const EventDetail = (props: any) => {
  const [eventDetails] = useState<EventSchema>(props?.data);
  const renderEventDetailSummary = (item: { title: string; value: string | undefined }, index: number) => {
    return (
      <AboutDetailItemWrapper key={index}>
        <AboutCardDetailsHeader>{item?.title}</AboutCardDetailsHeader>
        <AboutCardDetailsDescription>{item?.value}</AboutCardDetailsDescription>
      </AboutDetailItemWrapper>
    );
  };

  const renderSocialMediaData = (item: { title: string; value: string | undefined; Icon: any; onPress: () => void }, index: number) => {
    const Icon = item.Icon;
    return (
      <SocialMediaDetailItemWrapper key={index} onClick={item?.onPress}>
        <Icon fontSize='large' />
        <SocialMediaDescriptionWrapper>
          <SocialMediaCardDetailsHeader>{item?.title}</SocialMediaCardDetailsHeader>
          <SocialMediaCardDetailsDescription>{item?.value}</SocialMediaCardDetailsDescription>
        </SocialMediaDescriptionWrapper>
      </SocialMediaDetailItemWrapper>
    );
  };
  const getEventDetailsData = () => {
    return [
      {
        title: 'Summary',
        value: eventDetails?.notes,
      },
      {
        title: 'When',
        value: moment(eventDetails?.dateTime)?.format('dddd, MMMM Do YYYY, h:mm a'),
      },
    ];
  };

  const onTwitterSelect = () => {
    openInNewTab(`https://twitter.com/intent/tweet?url=${window?.location?.href}&text=${`Lets meet on ${eventDetails?.name || 'Right Muslim social app'}`}`);
  };

  const onFacebookSelect = () => {
    openInNewTab(`https://facebook.com/sharer/sharer.php?u=${window?.location?.href}`);
  };
  function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  }
  function objectToGetParams(object: { [key: string]: string | number | undefined | null }) {
    const params = Object.entries(object)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
  }

  function whatsappLink(url: string, { title, separator }: { title?: string; separator?: string }) {
    return (
      'https://' +
      (isMobileOrTablet() ? 'api' : 'web') +
      '.whatsapp.com/send' +
      objectToGetParams({
        text: title ? title + separator + url : url,
      })
    );
  }

  const onWhatsAppSelect = () => {
    openInNewTab(whatsappLink(window?.location?.href, { title: eventDetails?.name, separator: ' ' }));
  };

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const onCopyLinkClicked = () => {
    copyTextToClipboard(window.location.href);
  };

  const getSocialMediaData = () => {
    return [
      {
        title: 'Post event to Twitter',
        value: 'Let your followers know about the event',
        Icon: TwitterIcon,
        onPress: onTwitterSelect,
      },
      {
        title: 'Share on Facebook',
        value: 'Give the event some love in your news feed',
        Icon: FacebookIcon,
        onPress: onFacebookSelect,
      },
      {
        title: 'Share on Whatsapp',
        value: 'Share this exciting event with your frients and family',
        Icon: WhatsAppIcon,
        onPress: onWhatsAppSelect,
      },
      {
        title: 'Copy event link',
        value: 'Share the link in email, Facebook etc',
        Icon: ShareIcon,
        onPress: onCopyLinkClicked,
      },
    ];
  };
  const openInNewTab = useCallback((url: string) => {
    window?.open(url, '_blank')?.focus();
  }, []);
  const onAttendButtonClicked = useCallback(() => {
    let url = AppPlaystoreLink;
    if (isMobile) {
      url = eventDetails?.dynamicLink || AppPlaystoreLink;
    }
    url = eventDetails?.webLink || AppPlaystoreLink;
    openInNewTab(url);
  }, [eventDetails, openInNewTab]);
  return eventDetails?.name ? (
    <ContentWrapper>
      <Head>
        <title>{eventDetails?.name || 'Right - Muslim Social App'}</title>
        <meta name='description' content={eventDetails?.notes || 'Muslim Social event'} />
      </Head>
      <Content>
        <CardWrapper elevation={1}>
          <CardActionArea>
            <CardMedia component='img' height='140' image={eventDetails?.backgroundImage} alt='green iguana' />
            <CardContent>
              <EventNameHeader>{eventDetails?.name}</EventNameHeader>
              <EventDate>{moment(eventDetails?.dateTime)?.format('dddd, MMMM Do YYYY, h:mm a')}</EventDate>
            </CardContent>
          </CardActionArea>
        </CardWrapper>
        <BottomContentPadding>
          <ButtonWrapper>
            <AttendButton onClick={onAttendButtonClicked} variant='contained'>
              <AttendButtonText>Attend</AttendButtonText>
            </AttendButton>
          </ButtonWrapper>
          <ContentCardWrapper>
            <CardContent>
              <ContentHeaderWrapper>
                <TextSnippetIcon />
                <ContentHeaderTitle>About the event</ContentHeaderTitle>
              </ContentHeaderWrapper>
              <ContentCardDetails>{getEventDetailsData()?.map((el, index) => renderEventDetailSummary(el, index))}</ContentCardDetails>
            </CardContent>
          </ContentCardWrapper>
          <ContentCardWrapper>
            <CardContent>
              <ContentHeaderWrapper>
                <GroupsIcon />
                <ContentHeaderTitle>Invite people to the event</ContentHeaderTitle>
              </ContentHeaderWrapper>
              <ContentCardDetails>{getSocialMediaData()?.map((el, index) => renderSocialMediaData(el, index))}</ContentCardDetails>
            </CardContent>
          </ContentCardWrapper>
        </BottomContentPadding>
      </Content>
    </ContentWrapper>
  ) : (
    <FullPageCenterWrapper>
      <Head>
        <title>{'Right - Muslim Social App'}</title>
        <meta name='description' content={'Muslim Social event'} />
      </Head>
      <NoDataFound>No Event found</NoDataFound>
    </FullPageCenterWrapper>
  );
};
const FullPageCenterWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  width: 80%;
  max-width: 850px;
  background-color: #f2f6f8;
`;

const EventNameHeader = styled.h1`
  font-weight: 500;
  margin: 0px;
`;

const EventDate = styled.h3`
  font-weight: 400;
  margin: 0px;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const CardWrapper = styled(Card)`
  width: 100%;
`;

const AttendButton = styled(Button)`
  width: 100%;
  border-radius: 10px !important;
`;

const AttendButtonText = styled.p`
  color: white;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  text-transform: capitalize;
`;

const ContentCardWrapper = styled(Card)`
  margin-top: 20px;
`;

const ContentHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ContentHeaderTitle = styled.h3`
  color: black;
  font-weight: 500;
  display: inline-block;
  margin: 0px;
  margin-left: 20px;
`;

const ContentCardDetails = styled.div`
  margin-top: 20px;
`;

const AboutCardDetailsHeader = styled.h4`
  margin: 0px;
  color: rgba(167, 167, 167);
  font-weight: 600;
`;

const AboutCardDetailsDescription = styled.h4`
  margin: 0px;
  font-weight: 400;
`;

const BottomContentPadding = styled.div`
  padding: 20px 10px;
`;

const AboutDetailItemWrapper = styled.div`
  flex-direction: column;
  margin-bottom: 30px;
`;

const SocialMediaDetailItemWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  &:active {
    opacity: 0.4;
  }
`;

const SocialMediaDescriptionWrapper = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 15px;
`;

const SocialMediaCardDetailsHeader = styled.h4`
  margin: 0px;
  color: black;
  font-weight: 600;
`;

const NoDataFound = styled.h4`
  color: black;
  font-weight: 500;
`;

const SocialMediaCardDetailsDescription = styled.h4`
  margin: 0px;
  font-weight: 400;
`;

export default EventDetail;
