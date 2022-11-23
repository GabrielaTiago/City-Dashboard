import { SearchBar } from '../../shared/components';
import { LayoutPageBase } from '../../shared/layouts';

export function Dashboard() {
  return (
    <LayoutPageBase title='Página Inicial' taskBar={(
      <SearchBar searchInput buttonText='Novo'/>
    )}>
      
    </LayoutPageBase>
  );
}
