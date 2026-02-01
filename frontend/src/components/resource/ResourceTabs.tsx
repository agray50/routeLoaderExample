import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { TabOne } from '@components/resource/TabOne';
import { TabTwo } from '@components/resource/TabTwo';
import { TabThree } from '@components/resource/TabThree';

export function ResourceTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      <Box>
        {activeTab === 0 && <TabOne />}
        {activeTab === 1 && <TabTwo />}
        {activeTab === 2 && <TabThree />}
      </Box>
    </Box>
  );
}
