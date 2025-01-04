import { Box, Paper } from "@mui/material";

type CommandRendererProps = {
  payload: string;
};

const renderHomeAssistantAction = (
  payload: string,
) => `action: zha.issue_zigbee_cluster_command
data:
  ieee: <ieee>
  cluster_id: 0xFC03
  endpoint_id: 11
  command: 0x0000
  command_type: server
  params:
    data: '${payload}'`;

function CommandRenderer({ payload }: CommandRendererProps) {
  function selectContents(el: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
  }

  return (
    <>
      <h2>Command payload</h2>
      <Paper>
        <Box
          p={2}
          overflow="auto"
          onDoubleClick={(e) => selectContents(e.currentTarget)}
        >
          <code>{payload}</code>
        </Box>
      </Paper>
      <h2>HA action</h2>
      <Paper>
        <Box
          p={2}
          overflow="auto"
          onDoubleClick={(e) => selectContents(e.currentTarget)}
        >
          <code style={{ whiteSpace: "pre-wrap" }}>
            {renderHomeAssistantAction(payload)}
          </code>
        </Box>
      </Paper>
    </>
  );
}

export default CommandRenderer;
