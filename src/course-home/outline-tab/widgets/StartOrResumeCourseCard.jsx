import React from 'react';
import { Button, Card, CheckBox } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { useSelector } from 'react-redux';
import { sendTrackingLogEvent } from '@edx/frontend-platform/analytics';
import messages from '../messages';
import { useModel } from '../../../generic/model-store';

function StartOrResumeCourseCard({ intl }) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    org,
  } = useModel('courseHomeMeta', courseId);

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  const {
    resumeCourse: {
      hasVisitedCourse,
      url: resumeCourseUrl,
    },
  } = useModel('outline', courseId);

  if (!resumeCourseUrl) {
    return null;
  }

  const logResumeCourseClick = () => {
    sendTrackingLogEvent('edx.course.home.resume_course.clicked', {
      ...eventProperties,
      event_type: hasVisitedCourse ? 'resume' : 'start',
      url: resumeCourseUrl,
    });
  };

  return (
    <div className='row mb-5'>
      <CheckBox></CheckBox>
      <div className='col-8'>
        <p>I have read all the instructions carefully and I'm ready to start the assessment</p>
      </div>
      <div className='col-5'>
          <Button
            variant="primary"
            block
            href={resumeCourseUrl}
            onClick={() => logResumeCourseClick()}
          >
            Start Assessment
          </Button>
       </div>   
    </div>   
  );
}

StartOrResumeCourseCard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(StartOrResumeCourseCard);
