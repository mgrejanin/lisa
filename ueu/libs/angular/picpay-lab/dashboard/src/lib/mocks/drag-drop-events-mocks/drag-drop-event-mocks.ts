import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

export class DragDropEventMocks<T> {
    private createEvent(previousIndex: number, currentIndex: number): CdkDragDrop<T[], T[]> {
        return {
            previousIndex: previousIndex,
            currentIndex: currentIndex,
            item: undefined,
            container: undefined,
            previousContainer: undefined,
            isPointerOverContainer: true,
            distance: { x: 0, y: 0 },
            dropPoint: { x: 0, y: 0 },
        };
    }

    private createContainer(model: ModelItem<T>): CdkDropList<T[]> {
        const container: { id: string; data: T[] } = { id: model.id, data: model.data };
        return <CdkDropList<T[]>>container;
    }

    createContainerEvent(origin: ModelItem<T>, destiny: ModelItem<T>): CdkDragDrop<T[], T[]> {
        const event = this.createEvent(origin.index, destiny.index);
        event.container = this.createContainer(destiny);
        event.previousContainer = this.createContainer(origin);
        event.item = <CdkDrag<T>>{ data: origin.data[origin.index] };
        return event;
    }
}

export interface ModelItem<T> {
    id: string;
    data: T[];
    index: number;
}
