import { Observable, of, Subject } from 'rxjs';

import { mockBussinessGlossaryModelsDetail } from './business-glossary.mock';
import { BusinessGlossaryModelsDetail } from '../../../models/business-glossary/models-detail/item.model';

export class ModelsDetailServiceMock {
    setTitleModels(titleModelsDetail: string): void {}

    setDescriptionModels(descriptionModelsDetail: string): void {}

    setResultModels(resultModelsDetail: string): void {}

    setProjectModels(projectModelsDetail: string): void {}

    setTimesIaModels(timesIaModelsDetail: string): void {}

    setTimeImpactedModels(timeImpactedModelsDetail: string): void {}

    setTagsModels(tagsModelsDetail: string): void {}

    setStewardModels(stewardModelsDetail: string): void {}

    setOwnerModels(ownerModelsDetail: string): void {}

    setUsersModels(usersModelsDetail: string): void {}

    setBadgeModels(badgeModelsDetail: string): void {}

    getModelsDetail(name: string): Observable<BusinessGlossaryModelsDetail[]> {
        return of(mockBussinessGlossaryModelsDetail);
    }
}
