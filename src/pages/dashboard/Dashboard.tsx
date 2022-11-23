import { ToolBar } from '../../shared/components';
import { LayoutPageBase } from '../../shared/layouts';

export function Dashboard() {
  return (
    <LayoutPageBase title='Página Inicial' taskBar={(
      <ToolBar searchInput buttonText='Novo'/>
    )}>
      
    </LayoutPageBase>
  );
}
