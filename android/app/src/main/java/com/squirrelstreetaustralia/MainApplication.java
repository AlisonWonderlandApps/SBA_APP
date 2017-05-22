package com.squirrelstreetaustralia;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.wonday.pdf.RCTPdfView;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.keyee.pdfview.PDFView;
import com.airbnb.android.react.maps.MapsPackage;
import com.chirag.RNMail.RNMail;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTPdfView(),
            new RNFSPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new PDFView(),
            new MapsPackage(),
            new RNMail(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new RNReactNativeDocViewerPackage(),
            new ReactNativeContacts(),
            new RCTCameraPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
