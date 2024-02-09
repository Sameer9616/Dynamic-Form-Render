import React from 'react';
import FormRender from './FormRender';
import TableRender from './TableRender';

interface DynamicComponentProps{
	
} 

export const DynamicComponent: React.FC<DynamicComponentProps> = () => {
	const control = sessionStorage.getItem("viewjson");
	const jsonData = control ? JSON.parse(control) : null;

	return (
		<div style={{ background: '#83b783', minHeight: '100%', padding: '5px' }}>
			{jsonData.form && (
				<div>
					<h1>Data Flow:</h1>
					<FormRender formSchema={jsonData.form.data} />
				</div>
			)}
			<div>
				{jsonData.tables && jsonData.tables.map((table, index) => {
					return <TableRender key={index} tablename={table.name} tableSchema={table.data} />
				})}
			</div>

		</div>
	);
};

export default DynamicComponent;


