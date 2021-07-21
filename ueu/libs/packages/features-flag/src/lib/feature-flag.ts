import { Observable, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { FFConfig, Feature, FeatureType } from './models';

import { FeatureFlagClassMock } from './mocks/feature-flag.mock';

// eslint-disable-next-line
var global: any;

class FeatureFlagClass {
    config!: FFConfig;
    subject = new Subject<Feature[]>();
    controller = new AbortController();
    signal = this.controller.signal;

    private readonly TEN_MINUTES = 600000;

    init(config: FFConfig): void {
        this.config = new FFConfig(config.isProd, config.interval ? config.interval : this.TEN_MINUTES);

        this.fetchFeatures();
    }

    fetchFeatures(): void {
        timer(0, this.config.interval).subscribe(() => {
            this.fetchRequest();
        });
    }

    fetchRequest(): void {
        const apiUrl = this.config.isProd
            ? 'https://appws.picpay.com/flags/features'
            : 'https://gateway.service.ppay.me/flags/features';

        fetch(apiUrl, {
            method: 'post',
            body: JSON.stringify({}),
            signal: this.signal,
        })
            .then(this.handleErrors)
            .then((response: Response) => response.json())
            .then((response: Feature[]) => {
                this.sendFeatures(response);

                return response;
            })
            .catch(err => this.subject.error(err));
    }

    sendFeatures(features: Feature[]): void {
        this.subject.next(features);
    }

    clearFeatures(): void {
        this.subject.next();
    }

    getFeatures(): Observable<Feature[]> {
        return this.subject.asObservable();
    }

    getFeature(featureName: string): Observable<Feature | undefined> {
        return this.subject.pipe(
            map(items => {
                const feature = items.find((item: Feature) => item.name === featureName);
                return feature;
            }),
        );
    }

    isFeatureEnabled(featureName: string): Observable<Feature | boolean> {
        return this.subject.pipe(
            map(items => {
                const feature = items.find((item: Feature) => item.name === featureName);

                if (feature?.type === FeatureType.BOOLEAN) {
                    return JSON.parse(feature.value);
                }

                return feature;
            }),
        );
    }

    featureParseJSON(featureName: string): Observable<Feature> {
        return this.subject.pipe(
            map(items => {
                const feature = items.find((item: Feature) => item.name === featureName);

                if (feature?.type === FeatureType.JSON) {
                    return JSON.parse(feature.value);
                }

                return feature;
            }),
        );
    }

    reload(): void {
        this.controller.abort();
        this.controller = new AbortController();
        this.signal = this.controller.signal;

        this.fetchRequest();
    }

    private handleErrors(response: Response): Response {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response;
    }
}

export const FeatureFlag = global?.__DEV__ ? new FeatureFlagClassMock() : new FeatureFlagClass();
