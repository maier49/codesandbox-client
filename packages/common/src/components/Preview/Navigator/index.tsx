import React from 'react';

import { BackIcon } from '../../icons/Back';
import { ForwardIcon } from '../../icons/Forward';
import { ModuleViewIcon } from '../../icons/ModuleView';
import { NewWindowIcon } from '../../icons/NewWindow';
import { ProjectViewIcon } from '../../icons/ProjectView';
import { ReloadIcon } from '../../icons/Reload';
import Tooltip from '../../Tooltip';
import AddressBar from '../AddressBar';
import {
  AddressBarContainer,
  Container,
  Icon,
  IconWithBackground,
  Icons,
} from './elements';

export interface NavigatorProps {
  url: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onRefresh: () => void;
  toggleProjectView?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  togglePreviewMode?: () => void;
  previewMode?: 'instantPreview' | 'livePreview' | null;
  openNewWindow?: () => void;
  zenMode?: boolean;
  isProjectView: boolean;
}

function Navigator({
  url,
  onChange,
  onConfirm,
  onBack,
  onForward,
  onRefresh,
  isProjectView,
  toggleProjectView,
  togglePreviewMode,
  previewMode,
  openNewWindow,
  zenMode,
}: NavigatorProps) {
  return (
    <Container className="flying-container-handler" style={{ cursor: 'move' }}>
      <Icons>
        <Icon aria-label="Go Back" disabled={!onBack} onClick={onBack}>
          <BackIcon />
        </Icon>
        <Icon aria-label="Go Forward" disabled={!onForward} onClick={onForward}>
          <ForwardIcon />
        </Icon>
        <Icon aria-label="Refresh" onClick={onRefresh}>
          <ReloadIcon />
        </Icon>
      </Icons>
      <AddressBarContainer
        onMouseDown={e => {
          e.stopPropagation();
        }}
      >
        <AddressBar url={url} onChange={onChange} onConfirm={onConfirm} />
      </AddressBarContainer>
      {togglePreviewMode && (
        <IconWithBackground
          onClick={togglePreviewMode}
          moduleView={!isProjectView}
        >
          <Tooltip
            delay={0}
            content={
              previewMode === 'instantPreview'
                ? 'Hot reload on keypress'
                : previewMode === 'livePreview'
                ? 'Hot reload on save'
                : 'Refresh on save'
            }
            placement="left"
          >
            <span style={{ color: 'white' }}>
              {previewMode === 'instantPreview'
                ? 'Ø'
                : previewMode === 'livePreview'
                ? 'O'
                : 'x'}
            </span>
          </Tooltip>
        </IconWithBackground>
      )}
      {!zenMode && toggleProjectView && (
        <IconWithBackground
          onClick={toggleProjectView}
          moduleView={!isProjectView}
        >
          <Tooltip
            delay={0}
            content={isProjectView ? 'Project View' : 'Current Module View'}
            placement="left"
          >
            {isProjectView ? <ProjectViewIcon /> : <ModuleViewIcon />}
          </Tooltip>
        </IconWithBackground>
      )}
      {openNewWindow && (
        <IconWithBackground onClick={openNewWindow}>
          <Tooltip delay={0} content="Open In New Window">
            <NewWindowIcon />
          </Tooltip>
        </IconWithBackground>
      )}
    </Container>
  );
}

export default Navigator;
